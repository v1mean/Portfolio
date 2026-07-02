import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../api/api';

const CATEGORIES = ['All', 'Web', 'Mobile', 'Backend', 'AI/ML', 'Other'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.data);
      } catch {
        // handle silently
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="section-tag">Portfolio</div>
          <h1 className="section-title" style={{ marginBottom: '1rem' }}>
            All <span>Projects</span>
          </h1>
          <p className="section-subtitle">
            Every project I've built — from coursework to personal initiatives.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="filter-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              id={`filter-${cat.toLowerCase().replace('/', '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner" />
            <p>Loading projects...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="projects-grid" style={{ paddingBottom: '4rem' }}>
            {filtered.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No projects found</h3>
            <p>
              {activeFilter === 'All'
                ? 'Add projects from the Admin panel to display them here.'
                : `No ${activeFilter} projects yet. Try a different filter.`}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
