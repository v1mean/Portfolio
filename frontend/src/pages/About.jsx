import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { PERSONAL } from './Home';

const SERVICES = [
  { icon: '🌐', title: 'Web Development', desc: 'Full-stack web applications with React, Node.js, and modern CSS frameworks.' },
  { icon: '⚙️', title: 'API Development', desc: 'Scalable RESTful APIs with Express.js, proper authentication, and documentation.' },
  { icon: '🗄️', title: 'Database Design', desc: 'Efficient database schemas with MongoDB, MySQL, and Redis for caching.' },
  { icon: '🐛', title: 'Bug Fixing', desc: 'Debugging and fixing issues in existing codebases quickly and efficiently.' },
  { icon: '⚡', title: 'Performance Optimization', desc: 'Lighthouse 90+ scores, lazy loading, and bundle optimization.' },
  { icon: '☁️', title: 'Deployment', desc: 'Cloud deployment on AWS, Vercel, and Firebase with CI/CD pipelines.' },
];

const FUN_FACTS = [
  "🖥️ I've been coding for 3+ years",
  "☕ Powered by coffee and curiosity",
  "🌙 Best work done late at night",
  "📚 Currently learning system design",
  "🎮 I enjoy game development as a hobby",
  "🌏 Based in beautiful Cambodia",
];

const INFO_ITEMS = [
  { label: 'Student ID', value: PERSONAL.studentId, icon: '🎓' },
  { label: 'Location', value: PERSONAL.location, icon: '📍' },
  { label: 'Email', value: PERSONAL.email, icon: '📧' },
  { label: 'Telegram', value: PERSONAL.phone, icon: '📱' },
  { label: 'Experience', value: '3+ Years', icon: '⏱️' },
  { label: 'Graduation', value: '2028 (Expected)', icon: '🎓' },
];

export default function About() {
  return (
    <>
      {/* Page Header */}
      <ScrollReveal variant="up">
        <div className="page-header">
          <div className="container">
            <div className="section-tag">About Me</div>
            <h1 className="section-title">Who <span>I Am</span></h1>
            <p className="section-subtitle">Software engineering student, full-stack developer, and lifelong learner.</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Main About Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Left: Avatar + Quick Info */}
            <ScrollReveal variant="left">
              <div className="about-avatar-wrapper">
                <div className="about-avatar">
                  <span>👨‍💻</span>
                </div>
                <div className="about-avatar-status">
                  <span className="about-avatar-status-dot" />
                  Available for hire
                </div>
                <div className="about-quick-links">
                  <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" id="about-github-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href={`mailto:${PERSONAL.email}`} className="btn btn-outline btn-sm" id="about-email-btn">📧 Email</a>
                  <a href="/resume.pdf" download="NgornVimean_Resume.pdf" className="btn btn-primary btn-sm" id="about-resume-btn">📄 Résumé</a>
                </div>

                {/* Info Card */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {INFO_ITEMS.map((item) => (
                      <div key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0, width: '1.25rem' }}>{item.icon}</span>
                        <div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                          <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Bio + Services */}
            <div>
              <ScrollReveal variant="right">
                <h2 className="about-content-title">
                  I Build Things for <span>the Web</span>
                </h2>
                <p className="about-bio">
                  Hi! I'm <strong>Ngorn Vimean</strong>, a full-stack developer and software engineering student based in Phnom Penh, Cambodia. With over 3 years of hands-on coding experience, I specialize in building modern web applications from the ground up.
                </p>
                <p className="about-bio">
                  I started coding out of pure curiosity, and it quickly became a passion. I enjoy every layer of the stack — from designing clean, intuitive UIs in React to architecting robust REST APIs with Node.js, and managing data in MongoDB or MySQL.
                </p>
                <p className="about-bio">
                  I'm currently pursuing my Bachelor's degree in Software Engineering (finishing in 2028), while actively taking on real-world projects and internships. I believe the best way to learn is to build.
                </p>
              </ScrollReveal>

              {/* Fun Facts */}
              <ScrollReveal variant="up" delay={100}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
                    Fun Facts
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {FUN_FACTS.map((fact, i) => (
                      <span key={i} className="skill-tag" style={{ borderRadius: 'var(--radius-md)', padding: '0.4rem 0.75rem' }}>{fact}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Services */}
              <ScrollReveal variant="fade" delay={50}>
                <div className="section-tag" style={{ marginBottom: '1rem' }}>Services I Offer</div>
              </ScrollReveal>
              <div className="services-grid">
                {SERVICES.map((s, i) => (
                  <ScrollReveal key={i} variant="scale" delay={i * 80}>
                    <div className="service-card" id={`service-${s.title.toLowerCase().replace(/\s/g, '-')}`} style={{ height: '100%' }}>
                      <div className="service-card-icon">{s.icon}</div>
                      <div className="service-card-title">{s.title}</div>
                      <div className="service-card-desc">{s.desc}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Resume Banner */}
              <ScrollReveal variant="up" delay={200}>
                <div className="resume-banner">
                  <div className="resume-banner-text">
                    <h3>Want to work together?</h3>
                    <p>Download my résumé or reach out directly — let's build something great!</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href="/resume.pdf" download="NgornVimean_Resume.pdf" className="btn btn-primary" id="about-download-resume-btn">📄 Download Résumé</a>
                    <a href="/#contact" className="btn btn-outline" id="about-contact-btn">Get in Touch</a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
