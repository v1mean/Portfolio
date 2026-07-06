import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import ScrollReveal from '../components/ScrollReveal';
import { getProjects } from '../api/api';

// ─── PERSONAL DATA ───────────────────────────────────────────────────────────
export const PERSONAL = {
  name: 'Ngorn Vimean',
  greeting: "Hi, I'm",
  title: 'Full-Stack Developer',
  subtitle: '& Software Engineering Student',
  bio: "I'm a passionate software engineering student with 3 years of coding experience. I love building beautiful, performant web applications. From designing RESTful APIs to crafting pixel-perfect UIs — I enjoy every layer of the stack.",
  email: 'meanv081@gmail.com',
  phone: '092401458',
  location: 'Phnom Penh, Cambodia',
  github: 'https://github.com/v1mean',
  telegram: 'https://t.me/092401458',
  studentId: '6025010008',
};

const SKILLS = [
  {
    icon: '⚛️',
    title: 'Frontend Development',
    tags: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'React Router'],
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    tags: ['Node.js', 'Express.js', 'REST API', 'Python', 'Java', 'C/C++'],
  },
  {
    icon: '🗄️',
    title: 'Database & Cloud',
    tags: ['MongoDB', 'MySQL', 'Redis', 'AWS', 'Vercel', 'Firebase', 'Website Hosting'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Workflow',
    tags: ['Git', 'GitHub', 'VSCode', 'Figma', 'Antigravity', 'Codex', 'Postman'],
  },
];

const EDUCATION = [
  {
    date: '2024 – 2028',
    title: "Bachelor's Degree in Software Engineering",
    institution: 'Institute of Technology of Cambodia',
    desc: "Studying software engineering fundamentals including algorithms, data structures, web development, software architecture, and database systems. Expected graduation: 2028.",
  },
  {
    date: '2026',
    title: 'First Full-Stack Project',
    institution: 'Self-Directed',
    desc: 'Built my first complete full-stack web application using Node.js, Express, and MongoDB. Solidified my understanding of the MERN stack and REST APIs.',
  },
  {
    date: '2024',
    title: 'Started Coding Journey',
    institution: 'Self-Taught',
    desc: 'Began learning programming with Python and HTML/CSS. Discovered a passion for web development and started building small projects.',
  },
  {
    date: '2022 – 2024',
    title: 'High School Diploma',
    institution: 'High School Cambodia',
    desc: 'Completed high school with Grade B. Developed strong foundations in mathematics and computer science, sparking a passion for programming and web development.',
  },
];

const STATS = [
  { number: '3+', label: 'Years Coding' },
  { number: '10+', label: 'Projects Built' },
  { number: '15+', label: 'Technologies' },
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
      } catch { /* silent fallback */ }
      finally { setLoadingProjects(false); }
    };
    fetchProjects();
  }, []);

  return (
    <>
      {/* ──────────────────── HERO ──────────────────── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for opportunities &amp; freelance
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
              <a href="#contact" className="btn btn-outline" id="hero-contact-btn">Get In Touch</a>
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" id="hero-github-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="/resume.pdf" download="NgornVimean_Resume.pdf" className="btn btn-outline" id="hero-resume-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Résumé
              </a>
            </div>

            <div className="hero-socials">
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="social-link" id="hero-github-social" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={PERSONAL.telegram} target="_blank" rel="noopener noreferrer" className="social-link" id="hero-telegram-social" title="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href={`mailto:${PERSONAL.email}`} className="social-link" id="hero-email-social" title="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </div>
      </section>

      {/* ──────────────────── STATS ──────────────────── */}
      <section style={{ background: 'var(--bg-secondary)', padding: '2rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <ScrollReveal key={i} variant="scale" delay={i * 80}>
                <div className="stat-card">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── SKILLS ──────────────────── */}
      <section className="section" id="skills">
        <div className="container">
          <ScrollReveal variant="up">
            <div className="section-header">
              <div className="section-tag">Expertise</div>
              <h2 className="section-title">My <span>Technical Skills</span></h2>
              <p className="section-subtitle">Technologies and tools I've used in my projects and internship.</p>
            </div>
          </ScrollReveal>
          <div className="skills-grid">
            {SKILLS.map((cat, i) => (
              <ScrollReveal key={i} variant="up" delay={i * 100}>
                <div className="skill-category" style={{ height: '100%' }}>
                  <div className="skill-category-icon">{cat.icon}</div>
                  <h3 className="skill-category-title">{cat.title}</h3>
                  <div className="skill-tags">
                    {cat.tags.map((tag, j) => (
                      <span className="skill-tag" key={j}>{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container" />

      {/* ──────────────────── FEATURED PROJECTS ──────────────────── */}
      <section className="section" id="projects">
        <div className="container">
          <ScrollReveal variant="up">
            <div className="section-header">
              <div className="section-tag">Portfolio</div>
              <h2 className="section-title">Featured <span>Projects</span></h2>
              <p className="section-subtitle">My best work. Each project showcases different aspects of the stack.</p>
            </div>
          </ScrollReveal>

          {loadingProjects ? (
            <div className="loading-spinner"><div className="spinner" /><p>Loading projects...</p></div>
          ) : featuredProjects.length > 0 ? (
            <>
              <div className="projects-grid">
                {featuredProjects.map((p, i) => (
                  <ScrollReveal key={p._id} variant="up" delay={i * 120}>
                    <ProjectCard project={p} />
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal variant="fade" delay={360}>
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <Link to="/projects" className="btn btn-outline" id="view-all-projects-btn">
                    View All Projects →
                  </Link>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📂</div>
              <h3>No projects seeded yet</h3>
              <p>Go to <Link to="/admin" style={{ color: 'var(--accent-secondary)' }}>Admin</Link> → click "Seed Sample Data".</p>
            </div>
          )}
        </div>
      </section>

      <div className="divider container" />

      {/* ──────────────────── EDUCATION ──────────────────── */}
      <section className="section" id="education">
        <div className="container">
          <ScrollReveal variant="up">
            <div className="section-header">
              <div className="section-tag">Background</div>
              <h2 className="section-title">Education &amp; <span>Experience</span></h2>
              <p className="section-subtitle">My academic journey and professional milestones.</p>
            </div>
          </ScrollReveal>

          <div className="timeline" style={{ maxWidth: 720, margin: '0 auto' }}>
            {EDUCATION.map((item, i) => (
              <ScrollReveal key={i} variant="left" delay={i * 120}>
                <div className="timeline-item">
                  <div className="timeline-card">
                    <div className="timeline-date">{item.date}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <div className="timeline-institution">📍 {item.institution}</div>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade" delay={360}>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/experience" className="btn btn-outline" id="view-experience-btn">
                Full Experience Timeline →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider container" />

      {/* ──────────────────── CONTACT ──────────────────── */}
      <section className="section" id="contact">
        <div className="container">
          <ScrollReveal variant="up">
            <div className="section-header">
              <div className="section-tag">Get In Touch</div>
              <h2 className="section-title">Let's <span>Connect</span></h2>
              <p className="section-subtitle">Have a project in mind? Want to collaborate? I'd love to hear from you!</p>
            </div>
          </ScrollReveal>

          <div className="contact-grid">
            {/* Left: Info */}
            <div className="contact-info">
              <ScrollReveal variant="left">
                <h3>Contact Information</h3>
                <p>Feel free to reach out through the form or any of the channels below. I typically respond within 24 hours.</p>
              </ScrollReveal>
              <div className="contact-items">
                {[
                  { icon: '📧', label: 'Email', value: PERSONAL.email },
                  { icon: '📱', label: 'Telegram', value: PERSONAL.phone },
                  { icon: '📍', label: 'Location', value: PERSONAL.location },
                  { icon: '🐙', label: 'GitHub', value: 'github.com/v1mean' },
                ].map((item, i) => (
                  <ScrollReveal key={i} variant="left" delay={80 + i * 80}>
                    <div className="contact-item">
                      <div className="contact-item-icon">{item.icon}</div>
                      <div className="contact-item-text">
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <ScrollReveal variant="right" delay={120}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
