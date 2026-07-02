import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../api/api';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Backend', 'AI/ML', 'Other'];

const ALL_TECH_TAGS = [
  'React', 'Node.js', 'MongoDB', 'Python', 'JavaScript', 'Firebase',
  'Express', 'TensorFlow', 'MySQL', 'Redis', 'AWS', 'Tailwind CSS',
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTech, setActiveTech] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.data);
      } catch { /* silent */ }
      finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  // All tech tags that appear in loaded projects
  const dynamicTags = [
    'All',
    ...new Set(projects.flatMap((p) => p.technologies).slice(0, 15)),
  ];

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchTech = activeTech === 'All' || p.technologies.includes(activeTech);
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchTech && matchSearch;
  });

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="section-tag">Portfolio</div>
          <h1 className="section-title">All <span>Projects</span></h1>
          <p className="section-subtitle">
            From academic coursework to personal initiatives — every project I've built.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Search bar */}
        <div className="search-bar-wrapper">
          <svg className="search-bar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search-bar"
            type="text"
            placeholder="Search projects by name, description, or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="projects-search-input"
          />
        </div>

        {/* Category filter */}
        <div className="filter-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`category-filter-${cat.toLowerCase().replace('/', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology filter */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Filter by Technology
            </div>
            <div className="filter-tabs">
              {dynamicTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tab ${activeTech === tag ? 'active' : ''}`}
                  onClick={() => setActiveTech(tag)}
                  id={`tech-filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {filtered.length === 0
              ? 'No projects match your filters'
              : `Showing ${filtered.length} project${filtered.length !== 1 ? 's' : ''}`}
          </div>
        )}

        {/* Project grid */}
        {loading ? (
          <div className="loading-spinner"><div className="spinner" /><p>Loading projects...</p></div>
        ) : filtered.length > 0 ? (
          <div className="projects-grid">
            {filtered.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No projects found</h3>
            <p>
              {projects.length === 0
                ? 'Add projects from the Admin panel to display them here.'
                : 'Try adjusting your search or filters.'}
            </p>
            {(activeCategory !== 'All' || activeTech !== 'All' || search) && (
              <button
                className="btn btn-outline"
                style={{ marginTop: '1rem' }}
                onClick={() => { setActiveCategory('All'); setActiveTech('All'); setSearch(''); }}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
