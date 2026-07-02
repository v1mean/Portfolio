import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          © {year} Designed &amp; Built with <span>♥</span> by <strong>Your Name</strong>
        </p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <a href="/#contact">Contact</a>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
