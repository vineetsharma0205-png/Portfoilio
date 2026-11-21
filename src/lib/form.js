/**
 * Contact form handler: client-side validation, honeypot, fetch submission,
 * pending states, and fallback when unconfigured or offline.
 */

export function initContactForm(formElement, fallbackEmail = 'vineetsharma.0205@gmail.com') {
  if (!formElement) return;

  const submitBtn = formElement.querySelector('button[type="submit"]');
  const statusEl = formElement.querySelector('.form-status');
  const originalBtnText = submitBtn ? submitBtn.textContent : 'Send message';

  function showStatus(message, type = 'error', isHtml = false) {
    if (!statusEl) return;
    statusEl.className = `form-status is-${type}`;
    if (isHtml) {
      statusEl.innerHTML = message;
    } else {
      statusEl.textContent = message;
    }
    statusEl.focus?.();
  }

  function clearStatus() {
    if (!statusEl) return;
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    const formData = new FormData(formElement);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();
    const website = (formData.get('website') || '').toString().trim(); // Honeypot

    // Client-side validation mirroring server limits
    if (name.length < 2 || name.length > 80) {
      showStatus('Please provide a name between 2 and 80 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 120 || !emailRegex.test(email)) {
      showStatus('Please enter a valid email address (max 120 characters).');
      return;
    }

    if (message.length < 10 || message.length > 2000) {
      showStatus('Please enter a message between 10 and 2000 characters.');
      return;
    }

    // Set pending state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, message, website })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 503) {
        showStatus(`The form is unavailable right now. Please email me directly at <a href="mailto:${fallbackEmail}" class="contact-channel-val">${fallbackEmail}</a>.`, 'error', true);
        return;
      }

      if (response.status === 429) {
        showStatus(data.error || 'Too many messages sent. Please wait a few minutes before trying again.', 'error');
        return;
      }

      if (!response.ok || !data.ok) {
        showStatus(data.error || 'Failed to deliver message. Please try again or email directly.', 'error');
        return;
      }

      // Success
      formElement.reset();
      showStatus('Message transmitted successfully. I will review and follow up shortly.', 'success');
    } catch {
      showStatus(`The form is unavailable right now. Please email me directly at <a href="mailto:${fallbackEmail}" class="contact-channel-val">${fallbackEmail}</a>.`, 'error', true);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}
