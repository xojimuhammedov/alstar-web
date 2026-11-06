import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useScrollFrame';

/**
 * Animates numbers from 0 to their targets when the element enters the viewport.
 * The server render shows the final values (so crawlers and no-JS users see
 * real numbers); the client resets them to 0 only while they are off-screen.
 */
export function useCountUp<T extends HTMLElement>(targets: number[], duration = 1700) {
  const ref = useRef<T>(null);
  const [values, setValues] = useState(targets);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already visible: keep final values

    setValues(targets.map(() => 0));
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValues(targets.map((t) => Math.round(t * eased)));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // targets are static per page, so the effect runs once
  }, []);

  return { ref, values };
}

/** 20000 → "20 000" (the design uses a space as the thousands separator). */
export const formatNumber = (n: number) => n.toLocaleString('en-US').replace(/,/g, ' ');
