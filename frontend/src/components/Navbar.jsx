import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span>&lt;</span>Dev<span>/&gt;</span>
        </Link>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
          <li><a href="/#skills" onClick={closeMenu}>Skills</a></li>
          <li><a href="/#education" onClick={closeMenu}>Education</a></li>
          <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
          <li>
            <NavLink to="/admin" className="navbar-cta" onClick={closeMenu}>
              Admin
            </NavLink>
          </li>
        </ul>

        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger-btn"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
