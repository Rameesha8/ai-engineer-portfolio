const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('motion-ready');
  const revealTargets = document.querySelectorAll('main > section > .container');
  revealTargets.forEach((target) => target.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
}

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.code-toggle').forEach((button) => {
  button.dataset.label = button.textContent;
  button.addEventListener('click', () => {
    const panel = button.closest('.project').querySelector('.code-panel');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    panel.classList.toggle('open', !expanded);
    button.textContent = expanded ? button.dataset.label : 'Close';
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:rameeshasiddique2005@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
