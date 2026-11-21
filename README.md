# Vineet Sharma — Engineering Portfolio

A calm, precise, specification-style personal portfolio for mechanical engineering students and practitioners. Designed like an engineer's technical logbook and spec sheet rather than a generic startup template.

## 1. Project Organization

Everything is decoupled into simple data and styling tokens. Copy and project data live in a single JSON file; styling decisions live in a single CSS variables file. You can customize the entire site without touching frontend JavaScript logic.

```
portfolio/
├── index.html              # HTML shell, metadata, and zero-flash theme script
├── package.json            # Scripts and dependencies (Vite, Resend)
├── vite.config.js          # Vite build configuration
├── vercel.json             # Security headers, CSP, and caching policies
├── .env.example            # Template for email serverless credentials
├── .gitignore              # Ignored files (dist, node_modules, .env, .vercel)
├── README.md               # Beginner guide and recipes
├── api/
│   └── contact.js          # Vercel Node 20 serverless email endpoint
├── public/
│   ├── favicon.svg         # Technical geometric monogram mark
│   ├── resume.pdf          # Your resume PDF (replace with your file)
│   ├── og-image.png        # Open Graph preview card (1200x630)
│   ├── robots.txt          # Search engine crawler permissions
│   ├── sitemap.xml         # Site page index
│   └── images/             # Folder for project screenshots and CAD renders
└── src/
    ├── main.js             # Orchestrator: reads site.json, mounts sections, binds behaviors
    ├── content/
    │   └── site.json       # SINGLE SOURCE OF TRUTH: all text, links, projects & order
    ├── styles/
    │   ├── tokens.css      # SINGLE SOURCE OF TRUTH FOR STYLES: colors, fonts, spacing
    │   ├── base.css        # Resets, clamp() type scale, accessibility utilities
    │   └── components.css  # Spec-sheet hero, cards, tables, details, form
    ├── render/             # Modular section DOM builders
    │   ├── header.js       # Sticky header, dynamic nav links, theme toggle
    │   ├── hero.js         # Name, descriptor, CTA buttons, spec-sheet table
    │   ├── about.js        # Background narrative & measured metric counters
    │   ├── experience.js   # Engineering timeline & responsibilities
    │   ├── projects.js     # Asymmetric featured cards + expandable details list
    │   ├── skills.js       # Labeled two-column technical specification tables
    │   ├── certifications.js# Verified qualifications & notes
    │   ├── contact.js      # Direct channels & contact form
    │   └── footer.js       # Colophon and year
    └── lib/
        ├── theme.js        # Light/dark mode toggle, localStorage & OS sync
        ├── reveal.js       # Smooth scroll reveal (runs once)
        ├── scrollspy.js    # Active navigation highlight based on scroll position
        └── form.js         # Form submission, validation, honeypot & 503 fallback
```

---

## 2. Run Locally

Follow these three steps to run the portfolio on your local machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure local environment variables:**
   Copy `.env.example` to create your local `.env`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows Command Prompt, use `copy .env.example .env`)*

3. **Start local development server:**
   - **Frontend only:**
     ```bash
     npm run dev
     ```
     Open `http://localhost:3000` in your browser.
   - **Frontend + Serverless Function (`/api/contact`):**
     ```bash
     npx vercel dev
     ```
     This emulates Vercel serverless functions locally.

---

## 3. How to Customize

You do not need to understand JavaScript to modify this website.

### Recipe 1: Change my text or links
Open `src/content/site.json`. Edit the values under `identity` (name, email, github, linkedin, phone) and `hero.descriptor`. Changes immediately update throughout the entire site.

### Recipe 2: Add, remove, or reorder projects
Open `src/content/site.json` and find the `"projects"` array.
- To feature a project with a large card, set `"featured": true`.
- To make a project appear in the compact expandable list, set `"featured": false`.
- To reorder projects, move the JSON project object higher or lower in the array.

### Recipe 3: Reorder or hide sections
In `src/content/site.json`, look at the `"sections"` array:
```json
"sections": ["about", "experience", "projects", "skills", "certifications", "contact"]
```
- To hide a section (e.g., certifications), remove `"certifications"` from the array. The section and its nav link will disappear, and section numbering (`01`, `02`, etc.) will update automatically.
- To reorder sections, simply change their order in the array.

### Recipe 4: Change colors and fonts
Open `src/styles/tokens.css`.
- Change `--bg`, `--surface`, and `--ink` to alter the background and text palette.
- Change `--accent` to change the safety-orange highlight color.
- Change `--font-body` or `--font-mono` to change typography.
- Note: Zero raw hex codes exist outside `tokens.css`.

### Recipe 5: Replace images and the resume
- **Resume:** Place your official PDF into the `public/` folder and name it `resume.pdf` (replacing the placeholder).
- **Project Images:** Put your image files into `public/images/`. In `src/content/site.json`, set `"src": "/images/your-image.png"` inside the project's `"image"` object. If `"src"` is left empty `""`, a clean dashed blueprint placeholder box is rendered automatically.
- **OG Card:** Replace `public/og-image.png` with a 1200x630 pixel preview image.

### Recipe 6: Turn the contact form off
Open `src/content/site.json`, navigate to `"contact"`, and change `"formEnabled"` to `false`:
```json
"contact": {
  "heading": "Get in touch",
  "text": "I am looking for internship conversations in mechanical engineering.",
  "formEnabled": false
}
```
The contact form will vanish, leaving only your direct email, GitHub, and communication links.

---

## 4. Set Up Resend for Email Delivery

The contact form sends plain-text emails through [Resend](https://resend.com):

1. **Sign up:** Go to [resend.com](https://resend.com) and create a free account.
2. **Generate an API key:** Navigate to **API Keys** → **Create API Key**. Copy the key (starts with `re_`).
3. **What `onboarding@resend.dev` can do:** By default, Resend provides a shared testing domain (`onboarding@resend.dev`). This domain can only send emails to the **single email address you registered your Resend account with**. This is great for personal portfolios because messages from visitors are sent directly to your inbox.
4. **Custom domain (Optional later):** If you purchase a domain (e.g., `vineetsharma.com`), you can add it in Resend's **Domains** tab and add the 3 DNS records provided by Resend. Once verified, you can send from `contact@vineetsharma.com` to anyone.

---

## 5. Deploy to Vercel (Under 10 Minutes)

1. **Push to GitHub:**
   Initialize Git, commit your files, and push to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Log in to [vercel.com](https://vercel.com) using your GitHub account.
   - Click **Add New...** → **Project**.
   - Select your `portfolio` repository and click **Import**.

3. **Configure Environment Variables:**
   Under the **Environment Variables** section before deploying, add:
   - `RESEND_API_KEY`: Your key from Resend (e.g., `re_123456789...`)
   - `CONTACT_TO_EMAIL`: Your inbox (e.g., `vineetsharma.0205@gmail.com`)
   - `CONTACT_FROM_EMAIL`: `onboarding@resend.dev` (or your verified sender)

4. **Deploy & Test:**
   - Click **Deploy**. Vercel will build and assign your URL (e.g., `https://portfolio-yourname.vercel.app`).
   - Open your site and submit a test inquiry through the contact form. Check your inbox!

5. **Update Production URL:**
   Once Vercel assigns your live domain, open `src/content/site.json` and update `"siteUrl"`:
   ```json
   "siteUrl": "https://portfolio-yourname.vercel.app"
   ```
   Commit and push this change to GitHub. Vercel will redeploy automatically.

---

## 6. Custom Domain Steps

1. In the Vercel dashboard for your project, go to **Settings** → **Domains**.
2. Enter your custom domain (e.g. `vineetsharma.com` or `portfolio.vineetsharma.com`).
3. Follow Vercel's instructions to add either:
   - A `CNAME` record pointing to `cname.vercel-dns.com` (for subdomains).
   - An `A` record pointing to `76.76.21.21` (for apex domains).
4. Vercel automatically issues and renews free SSL certificates.

---

## 7. Troubleshooting Table

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Contact form returns 503** | `RESEND_API_KEY` or `CONTACT_TO_EMAIL` environment variable is missing on Vercel. | In Vercel Project Settings → Environment Variables, add the keys and trigger a redeploy. The UI will automatically show a fallback direct mailto link in the meantime. |
| **Emails not arriving** | Free Resend testing domain `onboarding@resend.dev` only delivers to the email account that registered the Resend account. | Ensure `CONTACT_TO_EMAIL` matches your Resend login email, or verify a custom domain in Resend. Also check your spam/junk folder. |
| **Fonts not loading** | Content Security Policy block or offline connection. | Check your browser console. `vercel.json` permits `fonts.googleapis.com` and `fonts.gstatic.com`. If using a strict corporate network, fonts gracefully fall back to `system-ui` and `ui-monospace`. |
| **Images 404** | Image file name mismatch or missing leading slash. | Ensure your image is located in `public/images/` and referenced in `site.json` as `"/images/filename.png"`. Remember file names are case-sensitive on Linux/Vercel. |
| **Dark mode flashes white on refresh** | Theme applied after first render. | An inline synchronous script in `index.html` inspects `localStorage` and OS preferences before first paint, eliminating theme flashing. Make sure that script is not removed. |

---

## 8. Pre-Launch Checklist

Before sharing your portfolio with recruiters or researchers:

- [ ] **Resume:** Replace `public/resume.pdf` with your updated academic/professional PDF.
- [ ] **Contact Info:** Decide whether to list your telephone number in `src/content/site.json` (`phone: "+91-..."`) or keep it empty `""` to omit it.
- [ ] **LinkedIn:** Add your LinkedIn profile URL in `site.json` under `identity.linkedin` if desired.
- [ ] **Domain URL:** Update `"siteUrl"` in `site.json` with your final production domain.
- [ ] **OG Preview Image:** Replace `public/og-image.png` with a customized 1200x630 graphic or CAD montage.
- [ ] **Mobile Test:** Test the site on a mobile device or responsive emulator down to 375px width.
- [ ] **Lighthouse Audit:** Open Chrome DevTools → Lighthouse → Run an audit. Target 95+ across Performance, Accessibility, Best Practices, and SEO.
