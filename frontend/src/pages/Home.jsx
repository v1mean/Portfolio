import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import { getProjects } from '../api/api';

// ─── Personal Data (Customize these!) ──────────────────────────────────────
const PERSONAL = {
  name: 'Your Name',
  greeting: "Hi there, I'm",
  title: 'Full-Stack Developer',
  subtitle: '& Software Engineering Student',
  bio: "I'm a passionate software engineering student who loves building beautiful, performant web applications. I specialize in React and Node.js, and I'm always eager to learn new technologies and tackle challenging problems.",
  email: 'yourname@email.com',
  phone: '+1 (555) 000-0000',
  location: 'Your City, Country',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
};

const SKILLS = [
  {
    icon: '⚛️',
    title: 'Frontend Development',
    tags: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Vite', 'React Router', 'Axios'],
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    tags: ['Node.js', 'Express.js', 'REST API', 'JWT Auth', 'Mongoose', 'Middleware'],
  },
  {
    icon: '🗄️',
    title: 'Database & Cloud',
    tags: ['MongoDB', 'MongoDB Atlas', 'AWS EC2', 'AWS S3', 'AWS Amplify', 'CloudFront'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Workflow',
    tags: ['Git', 'GitHub', 'VS Code', 'Postman', 'npm', 'Figma', 'Linux'],
  },
];

const EDUCATION = [
  {
    date: '2022 – Present',
    title: 'Bachelor of Science in Software Engineering',
    institution: 'Your University Name',
    desc: 'Studying core computer science fundamentals including algorithms, data structures, web development, software architecture, and database systems. Expected graduation: 2026.',
  },
  {
    date: '2023',
    title: 'Web Development Internship',
    institution: 'Company Name',
    desc: 'Worked on a Vue.js frontend application integrated with Firebase, gaining hands-on experience in real-world software development workflows and agile practices.',
  },
  {
    date: '2022',
    title: 'Meta Front-End Developer Certificate',
    institution: 'Coursera / Meta',
    desc: 'Completed a professional certificate program covering React, JavaScript, HTML/CSS, UI/UX principles, and version control with Git.',
  },
];

const STATS = [
  { number: '3+', label: 'Years Coding' },
  { number: '10+', label: 'Projects Built' },
  { number: '5+', label: 'Technologies' },
  { number: '100%', label: 'Dedication' },
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        const featured = res.data.data.filter((p) => p.featured).slice(0, 3);
        setFeaturedProjects(featured);
      } catch {
        // fallback silently
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      {/* ──────── HERO ──────── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for opportunities
            </div>
            <p className="hero-greeting">{PERSONAL.greeting}</p>
            <h1 className="hero-name">
              <span className="hero-name-gradient">{PERSONAL.name}</span>
            </h1>
            <h2 className="hero-title">
              {PERSONAL.title}{' '}
              <span className="highlight">// {PERSONAL.subtitle}</span>
            </h2>
            <p className="hero-bio">{PERSONAL.bio}</p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary" id="hero-view-projects-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                View Projects
              </Link>
              <a href="#contact" className="btn btn-outline" id="hero-contact-btn">
                Get In Touch
              </a>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                id="hero-github-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            <div className="hero-socials">
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" id="hero-linkedin" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href={PERSONAL.twitter} target="_blank" rel="noopener noreferrer" className="social-link" id="hero-twitter" title="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href={`mailto:${PERSONAL.email}`} className="social-link" id="hero-email" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </div>
      </section>

      {/* ──────── STATS ──────── */}
      <section style={{ background: 'var(--bg-secondary)', padding: '2rem 0' }}>
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── SKILLS ──────── */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Expertise</div>
            <h2 className="section-title">My <span>Technical Skills</span></h2>
            <p className="section-subtitle">Technologies and tools I've worked with throughout my studies and projects.</p>
          </div>
          <div className="skills-grid">
            {SKILLS.map((cat, i) => (
              <div className="skill-category" key={i}>
                <div className="skill-category-icon">{cat.icon}</div>
                <h3 className="skill-category-title">{cat.title}</h3>
                <div className="skill-tags">
                  {cat.tags.map((tag, j) => (
                    <span className="skill-tag" key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* ──────── FEATURED PROJECTS ──────── */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Portfolio</div>
            <h2 className="section-title">Featured <span>Projects</span></h2>
            <p className="section-subtitle">A selection of my best work. Each project demonstrates different skills and technologies.</p>
          </div>
          {loadingProjects ? (
            <div className="loading-spinner"><div className="spinner" /><p>Loading projects...</p></div>
          ) : featuredProjects.length > 0 ? (
            <>
              <div className="projects-grid">
                {featuredProjects.map((p, i) => (
                  <ProjectCard key={p._id} project={p} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <Link to="/projects" className="btn btn-outline" id="view-all-projects-btn">
                  View All Projects →
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📂</div>
              <h3>No projects yet</h3>
              <p>Go to the <Link to="/admin" style={{ color: 'var(--accent-secondary)' }}>Admin Panel</Link> to add projects or seed sample data.</p>
            </div>
          )}
        </div>
      </section>

      <div className="divider container" />

      {/* ──────── EDUCATION ──────── */}
      <section className="section" id="education">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Background</div>
            <h2 className="section-title">Education &amp; <span>Experience</span></h2>
            <p className="section-subtitle">My academic journey and professional experience.</p>
          </div>
          <div className="timeline" style={{ maxWidth: 720, margin: '0 auto' }}>
            {EDUCATION.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-card">
                  <div className="timeline-date">{item.date}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <div className="timeline-institution">📍 {item.institution}</div>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* ──────── CONTACT ──────── */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Let's <span>Connect</span></h2>
            <p className="section-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Feel free to reach out through the form or any of the channels below. I typically respond within 24 hours.</p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item-icon">📧</div>
                  <div className="contact-item-text">
                    <strong>Email</strong>
                    <span>{PERSONAL.email}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div className="contact-item-text">
                    <strong>Location</strong>
                    <span>{PERSONAL.location}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">💼</div>
                  <div className="contact-item-text">
                    <strong>LinkedIn</strong>
                    <span>linkedin.com/in/yourusername</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">🐙</div>
                  <div className="contact-item-text">
                    <strong>GitHub</strong>
                    <span>github.com/yourusername</span>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
