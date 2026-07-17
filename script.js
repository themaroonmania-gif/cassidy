/* ============================================================
   Cassidy Harden — personal site
   Vanilla JS. Everything fails safe: content stays visible
   even if none of this runs.
   ============================================================ */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Reveal on scroll (fail-safe) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
    // Safety valve: nothing stays hidden longer than 4s.
    setTimeout(() => reveals.forEach(el => el.classList.add('in')), 4000);
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

});
