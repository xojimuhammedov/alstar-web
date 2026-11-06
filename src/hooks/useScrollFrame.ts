import { useEffect, useRef } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs `onFrame` on scroll/resize, throttled to one call per animation frame.
 * The callback receives whether the user prefers reduced motion.
 */
export function useScrollFrame(onFrame: (reduced: boolean) => void) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        cb.current(reduced);
      });
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    cb.current(reduced);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}

export { prefersReducedMotion };
