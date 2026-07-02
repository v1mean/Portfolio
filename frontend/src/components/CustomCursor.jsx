import { useEffect, useRef, useState } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function CustomCursor() {
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (isTouchDevice()) return;

    const onMove = (e) => {
      setIsHidden(false);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Detect pointer target
      const el = e.target;
      const isClickable =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        window.getComputedStyle(el).cursor === 'pointer';
      setIsPointer(!!isClickable);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <div
      ref={ringRef}
      className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isHidden ? 'hidden' : ''}`}
      aria-hidden="true"
    />
  );
}
