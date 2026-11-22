/**
 * Contact render module: Super Eight Studio Mega CTA & Contact Docket.
 * Features massive "GOT A PROJECT? LET'S BUILD." title and contact form.
 */

export function renderContact({ contact, identity }, indexString = '06') {
  const section = document.createElement('section');
  section.className = 'section-wrapper reveal';
  section.id = 'contact';

  const container = document.createElement('div');
  container.className = 'container';

  // Mega CTA Block
  const megaCta = document.createElement('div');
  megaCta.className = 'mega-cta-section';
  megaCta.innerHTML = `
    <div class="section-eyebrow">${indexString} / GET IN TOUCH</div>
    <h2 class="mega-cta-title">GOT A CHALLENGE? LET'S BUILD.</h2>
    <p style="font-family: var(--font-sans); font-size: var(--text-lg); color: var(--muted-dark); max-width: 48ch;">
      ${contact.text || 'I am looking for internship and collaboration opportunities in mechanical design, structural analysis, and electromechanical prototyping.'}
    </p>
  `;

  container.appendChild(megaCta);
  section.appendChild(container);

  return section;
}
