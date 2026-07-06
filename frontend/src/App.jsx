import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import Terminal from './components/Terminal';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Particles from './components/Particles';
import MouseSpotlight from './components/MouseSpotlight';
import AnimatedBlobs from './components/AnimatedBlobs';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import Experience from './pages/Experience';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import './index.css';

function AppContent() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="app">
      {/* ── Fixed decorative layers (behind everything) ── */}
      <AnimatedBlobs />
      <Particles />
      <MouseSpotlight />

      {/* ── Fixed UI chrome ── */}
      <ScrollProgress />
      <CustomCursor />

      <Navbar
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <main className="main-content">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetailsPage />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />

      {/* Terminal Trigger FAB */}
      <button
        className="terminal-trigger"
        onClick={() => setTerminalOpen(true)}
        title="Open Terminal (Ctrl+`)"
        id="terminal-fab-btn"
      >
        <span className="terminal-trigger-dot" />
        <span style={{ fontFamily: 'var(--font-mono)' }}>~$ terminal</span>
      </button>

      {/* Overlays */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#10b981', secondary: 'var(--bg-card)' } },
          error: { iconTheme: { primary: '#ef4444', secondary: 'var(--bg-card)' } },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
