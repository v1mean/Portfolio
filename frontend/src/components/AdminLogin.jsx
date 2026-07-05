import { useState } from 'react';
import toast from 'react-hot-toast';
import { loginAdmin } from '../api/api';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error('Please enter the password');
      return;
    }
    
    setLoading(true);
    try {
      const res = await loginAdmin(password);
      if (res.data.success && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        toast.success('Access Granted! 🔓');
        onLogin();
      }
    } catch (error) {
      toast.error('Invalid Password! 🚫');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="modal" style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Access</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Enter the master password to access the dashboard.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{ textAlign: 'center', letterSpacing: '0.2rem', fontSize: '1.25rem' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Unlock Dashboard 🔑'}
          </button>
        </form>
      </div>
    </div>
  );
}
