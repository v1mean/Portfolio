import ScrollReveal from '../components/ScrollReveal';

const TIMELINE = [
  {
    year: '2028',
    title: "Bachelor's Degree — Software Engineering",
    org: 'Institute of Technology of Cambodia',
    type: 'education',
    icon: '🎓',
    desc: "Expected graduation with a Bachelor's in Software Engineering. Studying algorithms, data structures, system design, web development, databases, and software architecture.",
    tags: ['Software Engineering', 'Algorithms', 'System Design'],
    status: 'In Progress',
  },
  {
    year: '2026',
    title: 'First Full-Stack Project',
    org: 'Cambodia University of Technology',
    type: 'project',
    icon: '🚀',
    desc: 'Built a complete full-stack web application as a university internship project using Node.js, Express, and MongoDB. This project solidified my understanding of the MERN stack and REST APIs.',
    tags: ['Node.js', 'MongoDB', 'Express', 'React'],
    status: 'Milestone',
  },
  {
    year: '2024',
    title: "Started Bachelor's Degree",
    org: 'Institute of Technology of Cambodia',
    type: 'education',
    icon: '📚',
    desc: 'Enrolled in the Software Engineering program, beginning the journey into formal computer science education alongside continued self-study.',
    tags: ['C/C++', 'Mathematics', 'OOP'],
    status: 'Milestone',
  },
  {
    year: '2024',
    title: 'Started Coding Journey',
    org: 'Self-Taught',
    type: 'education',
    icon: '🌱',
    desc: 'Began learning programming with Python and HTML/CSS. Discovered a passion for web development and started building small projects while completing high school.',
    tags: ['Python', 'HTML', 'CSS', 'JavaScript'],
    status: 'Milestone',
  },
  {
    year: '2022',
    title: 'High School Diploma',
    org: 'High School Cambodia',
    type: 'education',
    icon: '📜',
    desc: 'Completed high school education with Grade B, with a focus on mathematics and sciences. Laid the foundation for further studies in software engineering.',
    tags: ['Mathematics', 'Sciences'],
    status: 'Completed',
  },
];

const CERTIFICATIONS = [
  { icon: '⚛️', title: 'Meta Front-End Developer', issuer: 'Coursera / Meta', year: '2023', color: '#0066ff' },
  { icon: '☁️', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024', color: '#ff9900' },
  { icon: '🐍', title: 'Python for Everybody', issuer: 'Coursera / UMich', year: '2022', color: '#306998' },
  { icon: '🗄️', title: 'MongoDB Basics', issuer: 'MongoDB University', year: '2023', color: '#13aa52' },
];

const TYPE_COLORS = {
  education: 'rgba(124,58,237,0.15)',
  work: 'rgba(6,182,212,0.15)',
  project: 'rgba(16,185,129,0.15)',
};

const TYPE_BORDER = {
  education: 'rgba(124,58,237,0.3)',
  work: 'rgba(6,182,212,0.3)',
  project: 'rgba(16,185,129,0.3)',
};

export default function Experience() {
  return (
    <>
      {/* Page Header */}
      <ScrollReveal variant="up">
        <div className="page-header">
          <div className="container">
            <div className="section-tag">Journey</div>
            <h1 className="section-title">Education &amp; <span>Experience</span></h1>
            <p className="section-subtitle">My academic background, work experience, and key milestones.</p>
          </div>
        </div>
      </ScrollReveal>

      <section className="section">
        <div className="container">
          {/* Legend */}
          <ScrollReveal variant="fade" delay={80}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
              {[['education', '🎓', 'Education'], ['work', '💼', 'Work'], ['project', '🚀', 'Project']].map(([key, icon, label]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', background: TYPE_COLORS[key], border: `1px solid ${TYPE_BORDER[key]}`, borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 500 }}>
                  {icon} {label}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Timeline — each item slides in from left with stagger */}
          <div style={{ maxWidth: 750, margin: '0 auto 4rem' }}>
            <div className="timeline">
              {TIMELINE.map((item, i) => (
                <ScrollReveal key={i} variant="left" delay={i * 100}>
                  <div className="timeline-item">
                    <div className="timeline-card" style={{ borderLeft: `3px solid ${TYPE_BORDER[item.type]}` }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                          <div>
                            <div className="timeline-date">{item.year}</div>
                            <h3 className="timeline-title" style={{ marginBottom: 0 }}>{item.title}</h3>
                          </div>
                        </div>
                        <span style={{ padding: '0.2rem 0.6rem', background: TYPE_COLORS[item.type], border: `1px solid ${TYPE_BORDER[item.type]}`, borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {item.status}
                        </span>
                      </div>
                      <div className="timeline-institution">📍 {item.org}</div>
                      <p className="timeline-desc" style={{ marginBottom: '1rem' }}>{item.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {item.tags.map((tag, j) => (
                          <span key={j} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Certifications header */}
          <ScrollReveal variant="up">
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <div className="section-tag">Certifications</div>
              <h2 className="section-title">Courses &amp; <span>Certificates</span></h2>
            </div>
          </ScrollReveal>

          {/* Cert cards staggered scale */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem', maxWidth: 800, margin: '0 auto 3rem' }}>
            {CERTIFICATIONS.map((cert, i) => (
              <ScrollReveal key={i} variant="scale" delay={i * 80}>
                <div className="timeline-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', height: '100%' }}>
                  <div style={{ width: 40, height: 40, background: `${cert.color}20`, border: `1px solid ${cert.color}40`, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {cert.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{cert.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cert.issuer}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>{cert.year}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Resume banner */}
          <ScrollReveal variant="up" delay={100}>
            <div className="resume-banner" style={{ maxWidth: 700, margin: '0 auto' }}>
              <div className="resume-banner-text">
                <h3>📄 Download My Full Résumé</h3>
                <p>A complete overview of my education, projects, skills, and experience.</p>
              </div>
              <a href="/resume.pdf" download="NgornVimean_Resume.pdf" className="btn btn-primary" id="experience-download-resume-btn">
                Download PDF
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
