import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(124,58,237,0.07), transparent 45%)`;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={ref} className="mouse-spotlight" aria-hidden="true" />;
}
