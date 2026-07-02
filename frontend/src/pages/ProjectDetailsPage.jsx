import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject } from '../api/api';
import { projectDetails } from '../data/projectDetails';
import toast from 'react-hot-toast';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project?.screenshots?.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % project.screenshots.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [project]);

  // Preload images to eliminate loading delay and flickering
  useEffect(() => {
    if (project?.screenshots) {
      project.screenshots.forEach(src => {
        const img1 = new Image();
        img1.src = src.startsWith('http') ? src : `http://localhost:5000${src}`;
        
        // Preload local fallback as well
        const img2 = new Image();
        img2.src = src;
      });
    }
  }, [project]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await getProject(id);
        if (data.success) {
          setProject(data.data);
        } else {
          toast.error("Failed to load project details");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        toast.error("Error loading project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
        
        {/* Atomic Orbital Spinner */}
        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          {/* Outer Ring */}
          <div style={{
            position: 'absolute', inset: 0,
            border: '2px solid transparent',
            borderTopColor: 'var(--accent-primary)',
            borderBottomColor: 'var(--accent-primary)',
            borderRadius: '50%',
            animation: 'spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
          }} />
          
          {/* Inner Ring */}
          <div style={{
            position: 'absolute', inset: '10px',
            border: '2px solid transparent',
            borderLeftColor: 'var(--accent-secondary)',
            borderRightColor: 'var(--accent-secondary)',
            borderRadius: '50%',
            animation: 'spin-reverse 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
          }} />
          
          {/* Core */}
          <div style={{
            position: 'absolute', inset: '32px',
            background: 'var(--accent-tertiary)',
            borderRadius: '50%',
            boxShadow: '0 0 20px 2px var(--accent-tertiary)',
            animation: 'pulse 1s ease-in-out infinite alternate'
          }} />
        </div>

        {/* Glitchy Terminal Text */}
        <div style={{ 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--text-secondary)', 
          letterSpacing: '3px', 
          fontSize: '0.9rem',
          animation: 'pulse 1s ease-in-out infinite alternate' 
        }}>
          &lt; DECRYPTING_PROJECT_DATA /&gt;
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg) scale(1); }
              50% { transform: rotate(180deg) scale(1.1); }
              100% { transform: rotate(360deg) scale(1); }
            }
            @keyframes spin-reverse {
              0% { transform: rotate(360deg) scale(1); }
              50% { transform: rotate(180deg) scale(0.9); }
              100% { transform: rotate(0deg) scale(1); }
            }
            @keyframes pulse {
              0% { opacity: 0.5; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1.2); }
            }
          `}
        </style>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem' }}>Project Not Found</h2>
        <button onClick={() => navigate('/projects')} className="btn btn-outline">Back to Projects</button>
      </div>
    );
  }

  const emoji = project.category === 'Web' ? '🌐' : project.category === 'Mobile' ? '📱' : '💡';

  return (
    <div className="project-details-page" style={{ paddingBottom: '4rem', animation: 'fadeIn 0.5s ease' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', width: '100%', padding: '4rem 2rem 10rem', background: 'radial-gradient(circle at top, var(--surface-2) 0%, var(--bg) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Floating Browser Mockup */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1000px', 
          aspectRatio: '16/9',
          display: 'flex',
          flexDirection: 'column',
          background: '#0d0d1a', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(6, 182, 212, 0.2)',
          overflow: 'hidden',
          zIndex: 2,
          animation: 'float 6s ease-in-out infinite'
        }}>
          {/* macOS Browser Header */}
          <div style={{ height: '36px', minHeight: '36px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
          
          {/* Browser Viewport */}
          <div style={{ position: 'relative', flex: 1, width: '100%' }}>
            {project.screenshots && project.screenshots.length > 0 ? (
              <>
                {project.screenshots.map((src, idx) => (
                  <img 
                    key={`fg-${idx}`}
                    src={src.startsWith('http') ? src : `http://localhost:5000${src}`} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    style={{ 
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      opacity: currentImageIndex === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out'
                    }}
                    onError={(e) => {
                      if (e.target.src.includes(':5000')) e.target.src = src;
                    }}
                  />
                ))}
              </>
            ) : project.imageUrl ? (
              <img 
                src={project.imageUrl.startsWith('http') ? project.imageUrl : `http://localhost:5000${project.imageUrl}`} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem' }}>
                <span style={{ fontSize: '6rem' }}>{emoji}</span>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Indicators */}
        {project.screenshots && project.screenshots.length > 1 && (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', zIndex: 10 }}>
            {project.screenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%', border: 'none',
                  background: currentImageIndex === idx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer', transition: 'background 0.3s ease'
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>

      <div className="container" style={{ position: 'relative', top: '-100px', zIndex: 10 }}>
        {/* Header Card */}
        <div style={{ 
          background: 'var(--bg-card)', 
          padding: '3rem', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--border-accent)', 
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '3rem'
        }}>
          <button 
            onClick={() => navigate('/projects')} 
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: 0 }}
          >
            ← Back to Projects
          </button>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {project.title}
              </h1>
              <div className="project-card-tech" style={{ margin: 0 }}>
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Live Demo
                </a>
              )}
            </div>
          </div>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', marginTop: '2.5rem' }}>
            {project.description}
          </p>
        </div>

        {/* Deep Dive Content */}
        {projectDetails[project.title] && (
          <div style={{ padding: '0 2rem' }}>
            {projectDetails[project.title]}
          </div>
        )}
      </div>
    </div>
  );
}
