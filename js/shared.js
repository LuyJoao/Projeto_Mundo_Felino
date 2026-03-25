/* ============================================================
   MUNDO FELINO — JS COMPARTILHADO
   Inclua este script em todas as páginas
   ============================================================ */

/* --- Menu mobile toggle --- */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '✕' : '☰';
  });

  /* Fecha o menu ao clicar em um link */
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

/* --- Botão voltar ao topo --- */
function initTopButton() {
  const btn = document.querySelector('.btn-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
}

/* --- Animação de entrada por scroll (Intersection Observer) --- */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

/* --- Marca link ativo no nav --- */
function initActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Bootstrap --- */
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initTopButton();
  initFadeIn();
  initActiveNav();
});