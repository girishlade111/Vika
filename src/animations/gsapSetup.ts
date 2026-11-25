import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateCounters(scope: HTMLElement | Document = document): () => void {
  if (prefersReducedMotion()) return () => {};
  const ctx = gsap.context(() => {
    const sel =
      '[data-count], .home-studio_figure-number, .ledger_value, .case-results_value, .case-cards_metric-value, .case-ledger_metric';
    const numRe = /\d[\d,]*(\.\d+)?/;
    const els = gsap.utils.toArray<HTMLElement>(sel, scope);

    els.forEach((el) => {
      const text = el.textContent || '';
      const m = text.match(numRe);
      if (!m) return;
      const raw = m[0];
      const dec = m[1] ? m[1].length - 1 : 0;
      const to = parseFloat(raw.replace(/,/g, ''));
      const comma = raw.includes(',');
      const pad = /^0\d/.test(raw) ? raw.length : 0;
      const obj = { v: 0 };

      const show = (v: number) => {
        let s = comma
          ? v.toLocaleString('en-GB', { minimumFractionDigits: dec, maximumFractionDigits: dec })
          : v.toFixed(dec);
        while (s.length < pad) s = '0' + s;
        el.textContent = text.replace(raw, s);
      };

      show(0);
      gsap.to(obj, {
        v: to,
        duration: 0.85,
        ease: 'power3.out',
        onUpdate: () => show(obj.v),
        onComplete: () => {
          el.textContent = text;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });
  }, scope);

  return () => ctx.revert();
}

export function animateSectionReveals(scope: HTMLElement | Document = document): () => void {
  if (prefersReducedMotion()) return () => {};
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.section-head', scope).forEach((el) => {
      gsap.from(el, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('.growth_fill', scope).forEach((el) => {
      const targetWidth = el.dataset.width || el.style.width || '100%';
      gsap.fromTo(
        el,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, scope);

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
