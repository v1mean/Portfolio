import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    // Tiny delay so opacity:0 is painted before we flip to 1
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShow(true));
    });
    return () => cancelAnimationFrame(t);
  }, [location.pathname]);

  return (
    <div className={`page-transition ${show ? 'visible' : ''}`}>
      {children}
    </div>
  );
}
