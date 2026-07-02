import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const COMMANDS = [
  { id: 'home', icon: '🏠', label: 'Go to Home', desc: 'Back to the main page', section: 'Navigation', path: '/' },
  { id: 'about', icon: '👤', label: 'Go to About', desc: 'Learn about Ngorn Vimean', section: 'Navigation', path: '/about' },
  { id: 'projects', icon: '📁', label: 'Go to Projects', desc: 'View all projects', section: 'Navigation', path: '/projects' },
  { id: 'experience', icon: '💼', label: 'Go to Experience', desc: 'Education & work history', section: 'Navigation', path: '/experience' },
  { id: 'blog', icon: '✍️', label: 'Go to Blog', desc: 'Read articles', section: 'Navigation', path: '/blog' },
  { id: 'contact', icon: '📬', label: 'Contact Me', desc: 'Get in touch', section: 'Navigation', action: 'contact' },
  { id: 'admin', icon: '⚙️', label: 'Admin Panel', desc: 'Manage projects & messages', section: 'Navigation', path: '/admin' },
  { id: 'theme', icon: '🌓', label: 'Toggle Dark/Light Mode', desc: 'Switch color scheme', section: 'Actions', action: 'theme' },
  { id: 'resume', icon: '📄', label: 'Download Résumé', desc: 'Get Ngorn Vimean\'s CV', section: 'Actions', action: 'resume' },
  { id: 'github', icon: '🐙', label: 'Open GitHub', desc: 'github.com/v1mean', section: 'Actions', action: 'github' },
  { id: 'email', icon: '📧', label: 'Send Email', desc: 'meanv081@gmail.com', section: 'Actions', action: 'email' },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  const filtered = query.trim()
    ? COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const executeCommand = useCallback(
    (cmd) => {
      onClose();
      if (cmd.path) {
        navigate(cmd.path);
        if (cmd.action === 'contact') {
          setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
      if (cmd.action === 'theme') toggleTheme();
      if (cmd.action === 'resume') {
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = 'NgornVimean_Resume.pdf';
        a.click();
      }
      if (cmd.action === 'github') window.open('https://github.com/v1mean', '_blank');
      if (cmd.action === 'email') window.open('mailto:meanv081@gmail.com', '_blank');
      if (cmd.action === 'contact') navigate('/');
    },
    [navigate, toggleTheme, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) executeCommand(filtered[selected]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, selected, filtered, executeCommand, onClose]);

  useEffect(() => setSelected(0), [query]);

  if (!open) return null;

  const sections = [...new Set(filtered.map((c) => c.section))];

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        {/* Input */}
        <div className="command-palette-input-wrapper">
          <svg className="command-palette-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className="command-palette-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            id="command-palette-input"
          />
          <span className="command-palette-kbd">ESC</span>
        </div>

        {/* Results */}
        <div className="command-palette-results">
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No commands found for "{query}"
            </div>
          ) : (
            sections.map((section) => (
              <div key={section}>
                <div className="command-palette-section-label">{section}</div>
                {filtered
                  .filter((c) => c.section === section)
                  .map((cmd, i) => {
                    const globalIdx = filtered.indexOf(cmd);
                    return (
                      <div
                        key={cmd.id}
                        className={`command-palette-item ${selected === globalIdx ? 'selected' : ''}`}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setSelected(globalIdx)}
                        id={`cmd-${cmd.id}`}
                      >
                        <div className="command-palette-item-icon">{cmd.icon}</div>
                        <div>
                          <div className="command-palette-item-label">{cmd.label}</div>
                          <div className="command-palette-item-desc">{cmd.desc}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="command-palette-footer">
          <div className="command-palette-footer-hint">
            <span className="command-palette-kbd">↑↓</span> navigate
          </div>
          <div className="command-palette-footer-hint">
            <span className="command-palette-kbd">↵</span> select
          </div>
          <div className="command-palette-footer-hint">
            <span className="command-palette-kbd">ESC</span> close
          </div>
        </div>
      </div>
    </div>
  );
}
