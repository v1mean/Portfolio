import { Link } from 'react-router-dom';

const SUGGESTIONS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Me' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/blog', label: 'Blog' },
];

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-bg" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Glitch 404 */}
        <div className="not-found-code">404</div>

        <h1 className="not-found-title">Oops! Page Not Found</h1>
        <p className="not-found-desc">
          This page doesn't exist or has been moved. Maybe try one of the links below?
        </p>

        {/* ASCII art */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.5rem',
          marginBottom: '2rem',
          textAlign: 'left',
          display: 'inline-block',
          whiteSpace: 'pre',
          lineHeight: '1.6',
        }}>
{`$ find /portfolio -name "this-page"
find: no results found

$ ls /portfolio
  home/    about/   projects/
  blog/    experience/  contact/

$ echo "Let's get you back on track..."`}
        </div>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary" id="not-found-home-btn">
            🏠 Go Home
          </Link>
          <Link to="/projects" className="btn btn-outline" id="not-found-projects-btn">
            📁 View Projects
          </Link>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: '2.5rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
            Quick Links
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {SUGGESTIONS.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="skill-tag"
                style={{ borderRadius: 'var(--radius-md)', padding: '0.4rem 0.9rem' }}
                id={`404-link-${s.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
