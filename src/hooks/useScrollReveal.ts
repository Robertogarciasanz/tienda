import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  staggerIndex?: number;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const { threshold = 0.8, staggerIndex = 0 } = options;
  const ref = useRef<T>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasRevealed = useRef(false);

  useEffect(() => {
    const element = ref.current;
    const imageEl = imageRef.current;
    const overlayEl = overlayRef.current;
    const textEl = textRef.current;
    if (!element || !imageEl || !overlayEl || !textEl) return;

    let rafId: number;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;

      // Image scale: 75% -> 30% of viewport
      const progressStart = vh * 0.75;
      const progressEnd = vh * 0.30;
      const progressRange = progressStart - progressEnd;

      let p = (progressStart - rect.top) / progressRange;
      p = Math.max(0, Math.min(1, p));

      const scale = 1.2 - 0.2 * p;
      const overlayOpacity = 0.7 * (1 - p);

      imageEl.style.transform = `scale(${scale})`;
      overlayEl.style.opacity = String(overlayOpacity);

      // Text slide-up: trigger once at threshold
      if (!hasRevealed.current && rect.top < vh * threshold) {
        hasRevealed.current = true;
        const delay = staggerIndex * 100;
        setTimeout(() => {
          textEl!.style.transform = 'translateY(0)';
          textEl!.style.opacity = '1';
        }, delay);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [threshold, staggerIndex]);

  return { ref, imageRef, overlayRef, textRef };
}
