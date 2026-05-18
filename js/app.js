/* ================================================
   ACADEMIA INPEC — App.js Global
   ================================================ */

// ---- Navbar scroll effect ----
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

// ---- Mobile menu toggle ----
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
})();

// ---- Scroll reveal (Intersection Observer) ----
(function () {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), +delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();

// ---- Counter animation ----
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const prefix   = el.dataset.prefix  || '';
  const suffix   = el.dataset.suffix  || '';
  const decimals = el.dataset.decimals || 0;
  const duration = 1800, step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = prefix + current.toFixed(decimals) + suffix;
  }, step);
}

(function () {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
})();

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
