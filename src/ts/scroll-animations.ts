import { qsa } from './dom.js';

/** Fades/slides `.animate-on-scroll` elements in via IntersectionObserver. */
export function initScrollAnimations(): void {
  const elements = qsa('.animate-on-scroll');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
