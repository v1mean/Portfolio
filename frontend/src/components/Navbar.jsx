import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenPalette, onOpenTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span style={{ fontFamily: 'var(--font-mono)' }}>&lt;</span>
          Vimean
          <span style={{ fontFamily: 'var(--font-mono)' }}>/&gt;</span>
        </Link>

        {/* Desktop Links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
          <li><NavLink to="/experience" onClick={closeMenu}>Experience</NavLink></li>
          <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        {/* Right Actions */}
        <div className="navbar-right">
          {/* Command Palette Button */}
          <button
            className="navbar-icon-btn"
            onClick={onOpenPalette}
            title="Command Palette (Ctrl+K)"
            id="open-command-palette-btn"
            aria-label="Open Command Palette"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </button>

          {/* Terminal Button */}
          <button
            className="navbar-icon-btn"
            onClick={onOpenTerminal}
            title="Interactive Terminal (Ctrl+`)"
            id="open-terminal-btn"
            aria-label="Open Terminal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="8,9 12,13 8,17"/><line x1="13" y1="17" x2="17" y2="17"/>
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            className="navbar-icon-btn"
            onClick={toggleTheme}
            title="Toggle Dark/Light Mode"
            id="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Admin CTA */}
          <NavLink to="/admin" className="navbar-cta" onClick={closeMenu} id="admin-navbar-btn">
            Admin
          </NavLink>

          {/* Hamburger */}
          <button
            className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="navbar-hamburger-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
