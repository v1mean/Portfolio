import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const POSTS = [
  {
    id: 1,
    emoji: '⚛️',
    tag: 'React',
    title: 'Building a Full-Stack Portfolio with React and Node.js',
    desc: 'A step-by-step guide on creating a production-ready portfolio website using the MERN stack — complete with CRUD operations, responsive design, and AWS deployment.',
    date: 'Jul 1, 2026',
    readTime: '8 min read',
    color: '#61dafb',
  },
  {
    id: 2,
    emoji: '🗄️',
    tag: 'MongoDB',
    title: 'MongoDB vs MySQL: Choosing the Right Database for Your Project',
    desc: 'A practical comparison of relational vs non-relational databases, when to use each, and how to migrate between them when your requirements change.',
    date: 'Jun 20, 2026',
    readTime: '6 min read',
    color: '#13aa52',
  },
  {
    id: 3,
    emoji: '☁️',
    tag: 'AWS',
    title: 'Deploying a Node.js App to AWS Elastic Beanstalk in 30 Minutes',
    desc: 'A concise walkthrough for deploying your Express.js backend to AWS EB, setting up environment variables, HTTPS, and connecting to MongoDB Atlas.',
    date: 'Jun 10, 2026',
    readTime: '10 min read',
    color: '#ff9900',
  },
  {
    id: 4,
    emoji: '⚡',
    tag: 'Performance',
    title: 'Achieving a 95+ Lighthouse Score: Practical Tips',
    desc: 'Everything I learned while optimizing my portfolio from a score of 72 to 96 — lazy loading, image compression, code splitting, and proper caching strategies.',
    date: 'May 28, 2026',
    readTime: '7 min read',
    color: '#f59e0b',
  },
  {
    id: 5,
    emoji: '🔐',
    tag: 'Security',
    title: 'JWT Authentication with Node.js: A Complete Guide',
    desc: 'Implementing secure JWT-based authentication in a REST API — access tokens, refresh tokens, middleware, and best practices to avoid common pitfalls.',
    date: 'May 15, 2026',
    readTime: '9 min read',
    color: '#a855f7',
  },
  {
    id: 6,
    emoji: '🐍',
    tag: 'Python',
    title: 'My Journey from Python Beginner to Full-Stack Developer',
    desc: 'How I started with Python scripts, moved to web development, and eventually became comfortable across the entire stack in just 3 years.',
    date: 'May 1, 2026',
    readTime: '5 min read',
    color: '#306998',
  },
];

const ALL_TAGS = ['All', ...new Set(POSTS.map((p) => p.tag))];

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = POSTS.filter((p) => {
    const matchTag = activeTag === 'All' || p.tag === activeTag;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.tag.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <ScrollReveal variant="up">
        <div className="page-header">
          <div className="container">
            <div className="section-tag">Writing</div>
            <h1 className="section-title">My <span>Blog</span></h1>
            <p className="section-subtitle">Thoughts, tutorials, and notes from my journey as a developer.</p>
          </div>
        </div>
      </ScrollReveal>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Search */}
        <ScrollReveal variant="up" delay={80}>
          <div className="search-bar-wrapper">
            <svg className="search-bar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="search-bar"
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="blog-search-input"
            />
          </div>
        </ScrollReveal>

        {/* Tag filter */}
        <ScrollReveal variant="fade" delay={120}>
          <div className="filter-tabs">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                className={`filter-tab ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
                id={`blog-tag-${tag.toLowerCase()}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Count */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Blog Grid — staggered cards */}
        {filtered.length > 0 ? (
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.id} variant="up" delay={i * 100}>
                <article className="blog-card" id={`blog-post-${post.id}`} style={{ height: '100%' }}>
                  <div className="blog-card-header">
                    <span className="blog-card-emoji">{post.emoji}</span>
                    <span className="blog-card-tag" style={{ background: `${post.color}20`, color: post.color, border: `1px solid ${post.color}40` }}>
                      {post.tag}
                    </span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-date">{post.date}</div>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-desc">{post.desc}</p>
                    <div className="blog-card-footer">
                      <span className="blog-card-read-time">⏱️ {post.readTime}</span>
                      <button className="btn btn-outline btn-sm" onClick={() => alert('Full blog posts coming soon! 🚀')} id={`read-more-${post.id}`}>
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">✍️</div>
            <h3>No articles found</h3>
            <p>Try a different search term or tag.</p>
          </div>
        )}

        {/* Subscribe Banner */}
        <ScrollReveal variant="up" delay={200}>
          <div className="resume-banner" style={{ marginTop: '3rem' }}>
            <div className="resume-banner-text">
              <h3>📬 More Coming Soon</h3>
              <p>I'm actively writing more tutorials and dev notes. Check back regularly!</p>
            </div>
            <a href="/#contact" className="btn btn-primary" id="blog-contact-btn">Get Notified</a>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
