import { useEffect, useRef } from 'react';

/**
 * ScrollReveal
 * Wraps any content and animates it in when it enters the viewport.
 *
 * Props:
 *   variant  – 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
 *   delay    – ms before the animation starts (for stagger groups)
 *   duration – animation duration in ms (default 700)
 *   threshold– how much of the element must be visible (0–1, default 0.12)
 *   as       – HTML tag to render (default 'div')
 */
export default function ScrollReveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  className = '',
  as: Tag = 'div',
  style = {},
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('sr-visible');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          io.unobserve(el); // fire once
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`sr sr-${variant} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
