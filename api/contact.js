/**
 * Vercel Serverless Function: POST /api/contact
 * Handles contact form submissions and transmits plain-text email notifications via Resend.
 *
 * NOTE ON SERVERLESS RATE LIMITING:
 * The in-memory Map below provides best-effort rate limiting per active serverless instance.
 * Because serverless execution environments do not share memory across concurrent or newly spawned
 * instances, this in-memory store resets when instances cold-start or scale.
 * If spam volume increases, the recommended upgrade path is Upstash Redis (@upstash/ratelimit).
 */

import { Resend } from 'resend';

// Best-effort in-memory store for IP rate limiting
const ipRateMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

// Periodically purge expired rate limit entries to avoid memory leak
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, record] of ipRateMap.entries()) {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
      ipRateMap.delete(ip);
    }
  }
}

function stripControlChars(str) {
  if (typeof str !== 'string') return '';
  // Strip control characters (ASCII 0-31 except \r, \n, \t and DEL 127)
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

export default async function handler(req, res) {
  // 1. Enforce POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed. Use POST.' });
  }

  // 2. Reject non-JSON or bodies over 10KB (10,240 bytes)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 10240) {
    return res.status(400).json({ ok: false, error: 'Payload exceeds maximum limit of 10KB.' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return res.status(400).json({ ok: false, error: 'Content-Type must be application/json.' });
  }

  // Parse body safely
  let body = req.body;
  if (typeof body === 'string') {
    if (Buffer.byteLength(body) > 10240) {
      return res.status(400).json({ ok: false, error: 'Payload exceeds maximum limit of 10KB.' });
    }
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON payload structure.' });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Request body must be a JSON object.' });
  }

  const { name, email, message, website } = body;

  // 3. Honeypot check: If hidden website field is populated, silently drop and return 200
  if (website && typeof website === 'string' && website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  // 4. Input sanitization and validation
  const cleanName = stripControlChars(typeof name === 'string' ? name.trim() : '');
  const cleanEmail = stripControlChars(typeof email === 'string' ? email.trim() : '');
  const cleanMessage = stripControlChars(typeof message === 'string' ? message.trim() : '');

  if (cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({ ok: false, error: 'Name must be between 2 and 80 characters.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || cleanEmail.length > 120 || !emailRegex.test(cleanEmail)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address (max 120 characters).' });
  }

  if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
    return res.status(400).json({ ok: false, error: 'Message must be between 10 and 2000 characters.' });
  }

  // 5. In-memory rate limiting per client IP
  cleanupRateLimitMap();
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress) || 'unknown';

  const now = Date.now();
  const userRate = ipRateMap.get(clientIp);

  if (userRate) {
    if (now - userRate.startTime < RATE_LIMIT_WINDOW_MS) {
      if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          ok: false,
          error: 'Rate limit exceeded. Please wait 10 minutes before submitting another message.'
        });
      }
      userRate.count += 1;
    } else {
      ipRateMap.set(clientIp, { startTime: now, count: 1 });
    }
  } else {
    ipRateMap.set(clientIp, { startTime: now, count: 1 });
  }

  // 7. Verify environment configuration
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !toEmail) {
    return res.status(503).json({ ok: false, error: 'Contact form is not configured.' });
  }

  // 6. Send email via Resend (Plain-text only)
  try {
    const resend = new Resend(apiKey);
    const plainTextBody = [
      `New Portfolio Inquiry from: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `IP: ${clientIp}`,
      `Time: ${new Date().toISOString()}`,
      '',
      'Message:',
      cleanMessage
    ].join('\n');

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: cleanEmail,
      subject: `Portfolio message from ${cleanName}`,
      text: plainTextBody
    });

    if (error) {
      console.error('Resend delivery failure:', error);
      return res.status(502).json({ ok: false, error: 'Unable to deliver message at this time. Please try again later.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Internal contact handler error:', err?.message || 'Unknown error');
    // Rule 10: Never return stack traces or env values
    return res.status(502).json({ ok: false, error: 'An error occurred while transmitting your message.' });
  }
}
