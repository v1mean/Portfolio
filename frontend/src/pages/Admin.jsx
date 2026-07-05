import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProjectCard from '../components/ProjectCard';
import {
  getProjects, createProject, updateProject, deleteProject, seedProjects, uploadImage,
  getMessages, markMessageRead, deleteMessage, verifyAdmin
} from '../api/api';
import AdminLogin from '../components/AdminLogin';

const EMPTY_FORM = {
  title: '',
  description: '',
  technologies: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  category: 'Web',
  featured: false,
  order: 0,
};

const CATEGORIES = ['Web', 'Mobile', 'Backend', 'AI/ML', 'Other'];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ── Fetch data ──────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.data);
    } catch {
      toast.error('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data.data);
    } catch {
      toast.error('Failed to load messages.');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          await verifyAdmin();
          setIsAuthenticated(true);
          fetchProjects();
          fetchMessages();
        } catch (error) {
          localStorage.removeItem('adminToken');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (loading && !isAuthenticated) {
    return <div className="admin-page"><div className="container"><div className="loading-spinner"><div className="spinner" /></div></div></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="container">
          <AdminLogin onLogin={() => {
            setIsAuthenticated(true);
            setLoading(true);
            fetchProjects();
            fetchMessages();
          }} />
        </div>
      </div>
    );
  }

  // ── Form helpers ─────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setForm({
      ...project,
      technologies: project.technologies.join(', '),
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // ── CRUD operations ───────────────────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    const loadingToast = toast.loading('Uploading image...');
    
    try {
      const res = await uploadImage(formData);
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
      toast.success('Image uploaded successfully', { id: loadingToast });
    } catch (err) {
      toast.error('Image upload failed', { id: loadingToast });
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
    };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
        toast.success('Project updated! ✅');
      } else {
        await createProject(payload);
        toast.success('Project created! 🚀');
      }
      closeForm();
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted.');
      fetchProjects();
    } catch {
      toast.error('Failed to delete project.');
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will replace ALL existing projects with sample data. Continue?')) return;
    try {
      await seedProjects();
      toast.success('Sample projects seeded! 🌱');
      fetchProjects();
    } catch {
      toast.error('Seeding failed.');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      fetchMessages();
    } catch {
      toast.error('Failed to mark as read.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      toast.success('Message deleted.');
      fetchMessages();
    } catch {
      toast.error('Failed to delete.');
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">⚙️ Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>🚪 Logout</button>
            {activeTab === 'projects' && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-outline btn-sm" onClick={handleSeed} id="seed-btn">
                  🌱 Seed Sample Data
                </button>
                <button className="btn btn-primary" onClick={openCreate} id="create-project-btn">
                  + Add Project
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
            id="tab-projects"
          >
            📁 Projects ({projects.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
            id="tab-messages"
          >
            📬 Messages {unreadCount > 0 && `(${unreadCount} new)`}
          </button>
        </div>

        {/* ──── PROJECTS TAB ──── */}
        {activeTab === 'projects' && (
          <>
            {/* Project Form Modal */}
            {showForm && (
              <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeForm()}>
                <div className="modal">
                  <div className="modal-header">
                    <h3>{editingId ? '✏️ Edit Project' : '➕ Add New Project'}</h3>
                    <button className="modal-close" onClick={closeForm}>✕</button>
                  </div>
                  <form onSubmit={handleSubmit} id="project-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Title *</label>
                        <input className="form-control" name="title" value={form.title} onChange={handleChange} required placeholder="Project Title" />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select className="form-control" name="category" value={form.category} onChange={handleChange}>
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description *</label>
                      <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Describe your project..." />
                    </div>
                    <div className="form-group">
                      <label>Technologies (comma-separated)</label>
                      <input className="form-control" name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB..." />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>GitHub URL</label>
                        <input className="form-control" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
                      </div>
                      <div className="form-group">
                        <label>Live URL</label>
                        <input className="form-control" name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ position: 'relative' }}>
                        <label>Image Screenshot</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                          <label 
                            htmlFor="image-upload-input" 
                            className="btn btn-outline btn-sm" 
                            style={{ margin: 0, cursor: uploadingImage ? 'not-allowed' : 'pointer', opacity: uploadingImage ? 0.7 : 1 }}
                          >
                            {uploadingImage ? '⏳ Uploading...' : '📁 Select Image'}
                          </label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            disabled={uploadingImage}
                            id="image-upload-input"
                            style={{ display: 'none' }}
                          />
                        </div>
                        {form.imageUrl && (
                          <div style={{ marginTop: '0.75rem', position: 'relative', width: 'fit-content' }}>
                            <img 
                              src={form.imageUrl.startsWith('http') ? form.imageUrl : (import.meta.env.PROD ? form.imageUrl : `http://localhost:5000${form.imageUrl}`)} 
                              alt="Preview" 
                              style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} 
                            />
                            <button 
                              type="button" 
                              onClick={() => setForm(prev => ({ ...prev, imageUrl: '' }))}
                              style={{ position: 'absolute', top: -8, right: -8, background: 'var(--error)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Display Order</label>
                        <input className="form-control" type="number" name="order" value={form.order} onChange={handleChange} min={0} />
                      </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" id="featured-check" name="featured" checked={form.featured} onChange={handleChange} />
                      <label htmlFor="featured-check" style={{ margin: 0, cursor: 'pointer' }}>Featured on homepage</label>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                      <button type="submit" className="btn btn-primary" disabled={submitting} id="submit-project-btn">
                        {submitting ? 'Saving...' : (editingId ? 'Update Project' : 'Create Project')}
                      </button>
                      <button type="button" className="btn btn-outline" onClick={closeForm}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Projects Table */}
            {loading ? (
              <div className="loading-spinner"><div className="spinner" /></div>
            ) : projects.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Category</th>
                      <th>Technologies</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p._id}>
                        <td><strong>{p.title}</strong></td>
                        <td>{p.category}</td>
                        <td style={{ maxWidth: 200 }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {p.technologies.slice(0, 3).map((t, i) => (
                              <span key={i} className="tech-tag">{t}</span>
                            ))}
                            {p.technologies.length > 3 && (
                              <span className="tech-tag">+{p.technologies.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td>{p.featured ? '⭐ Yes' : '—'}</td>
                        <td>
                          <div className="table-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)} id={`admin-edit-${p._id}`}>
                              ✏️ Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)} id={`admin-delete-${p._id}`}>
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📂</div>
                <h3>No projects yet</h3>
                <p>Click "Add Project" or "Seed Sample Data" to get started.</p>
              </div>
            )}
          </>
        )}

        {/* ──── MESSAGES TAB ──── */}
        {activeTab === 'messages' && (
          <div className="messages-list">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div key={m._id} className={`message-card ${!m.isRead ? 'unread' : ''}`}>
                  <div className="message-card-header">
                    <div className="message-sender">
                      <strong>{m.name}</strong>
                      <span>{m.email}</span>
                    </div>
                    <div className="message-meta">
                      {!m.isRead && <span className="unread-badge">NEW</span>}
                      <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                      {!m.isRead && (
                        <button className="btn btn-outline btn-sm" onClick={() => handleMarkRead(m._id)}>
                          Mark Read
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMessage(m._id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="message-subject">{m.subject}</div>
                  <div className="message-body">{m.message}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <h3>No messages yet</h3>
                <p>Messages sent through the contact form will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
