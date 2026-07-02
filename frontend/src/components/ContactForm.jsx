import { useState } from 'react';
import toast from 'react-hot-toast';
import { sendMessage } from '../api/api';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage(form);
      toast.success('Message sent successfully! I\'ll get back to you soon. 🚀');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-name">Full Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className="form-control"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className="form-control"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          className="form-control"
          placeholder="Let's work together!"
          value={form.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          className="form-control"
          placeholder="Tell me about your project or just say hello..."
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        id="contact-submit"
        disabled={loading}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {loading ? (
          <>
            <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
            Sending...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9"/>
            </svg>
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
