const animatedBlocks = document.querySelectorAll('[data-animate]');
const navLinks = document.querySelectorAll('header nav a, .footer__links a, .btn.outline');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const scrollBar = document.querySelector('.scroll-progress');
const pageSections = document.querySelectorAll('main section');
const themeToggle = document.querySelector('.theme-toggle');
const contactEmail = '2200030839cser@gmail.com';

// Intersection observer to reveal sections as they enter the viewport.
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedBlocks.forEach(block => observer.observe(block));

// Smooth scroll for internal links.
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll progress indicator to reinforce orientation.
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (scrollBar) {
    scrollBar.style.width = `${progress}%`;
  }
};

updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress);

// Highlight nav items based on current section.
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const matches = href && href.replace('#', '') === id;
          link.classList.toggle('active', Boolean(matches));
        });
      }
    });
  },
  { threshold: 0.35 }
);

pageSections.forEach(section => sectionObserver.observe(section));

// Theme toggle (light/dark) with persistence.
const sunIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.2m0 14.6v2.2m9.5-9.5h-2.2M4.7 12H2.5m14.6-7.3-1.6 1.6M8.5 18.1l-1.6 1.6m0-14.6 1.6 1.6m6.8 11.2 1.6 1.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const moonIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 10 4a8.5 8.5 0 1 0 10 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const getPreferredTheme = () => {
  const stored = localStorage.getItem('theme-preference');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = mode => {
  const theme = mode === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme-preference', theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'light' ? moonIcon : sunIcon;
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  }
};

applyTheme(getPreferredTheme());

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// Lightweight form validation with user feedback.
form?.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const countryCode = formData.get('countryCode')?.toString().trim() || '+91';
  const phoneNumber = formData.get('phone')?.toString().trim();
  const phone = phoneNumber ? `${countryCode} ${phoneNumber}` : '';
  const message = formData.get('message')?.toString().trim();
  const emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    formStatus.textContent = 'Please complete all required fields with a valid email.';
    formStatus.style.color = '#ff9e9e';
    return;
  }

  formStatus.textContent = 'Sending message...';
  formStatus.style.color = 'var(--accent)';

  try {
    // Simulate sending for portfolio display
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    formStatus.style.color = 'var(--accent)';
    form.reset();
  } catch (error) {
    formStatus.textContent = 'Network error. Please check your connection and try again.';
    formStatus.style.color = '#ff9e9e';
  }
});
