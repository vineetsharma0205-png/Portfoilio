/**
 * About render module: Clean summary narrative.
 * Minimalist, high-clarity introduction with generous reading width space.
 */

export function renderAbout(about, indexString = '01') {
  const section = document.createElement('section');
  section.className = 'section-white reveal';
  section.id = 'about';

  const container = document.createElement('div');
  container.className = 'container';

  // Section Heading with crimson accent indicator
  const heading = document.createElement('h2');
  heading.className = 'section-heading-dark';
  heading.innerHTML = `<span class="heading-accent-bar" aria-hidden="true"></span>ABOUT ME`;

  // Summary narrative with generous reading width space
  const leadText = document.createElement('p');
  leadText.className = 'summary-lead';
  leadText.textContent = (about.paragraphs && about.paragraphs.join(' ')) ||
    "I am an undergraduate mechanical engineering student with hands-on experience in CAD/CAE, structural FEA, and system-level vehicle design. My work spans IIT Roorkee research internship, BAJA SAE suspension engineering, and multi-disciplinary fabrication projects, each validated with measurable real-world results.";

  container.appendChild(heading);
  container.appendChild(leadText);
  section.appendChild(container);

  return section;
}
