import React, { useState } from 'react';
import { Alert, Spinner } from '../components/UI';
import Navbar from '../components/Navbar';
import axios from 'axios';

const InputField = ({ label, icon, ...props }) => (
  <div>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.3px' }}>
      {icon && <span style={{ marginRight: '6px' }}>{icon}</span>}{label}
    </label>
    <input className="input-field" {...props} />
  </div>
);

const Auth = ({ isLogin = true }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', age: '', userType: 'student',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      <Navbar />

      <div className="orb" style={{ width: 500, height: 500, top: -100, left: -150, background: 'rgba(59,130,246,0.12)' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: -100, right: -100, background: 'rgba(124,58,237,0.15)' }} />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <main style={{
        position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '440px', animation: 'fadeInUp 0.5s ease both' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              width: '64px', height: '64px', background: 'var(--gradient-primary)',
              borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', margin: '0 auto 20px', boxShadow: '0 8px 30px var(--blue-glow)',
            }}>🎓</div>
            <h1 style={{
              fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.8rem', margin: '0 0 8px',
              background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
              {isLogin ? 'Sign in to your account' : 'Create your free account'}
            </p>
          </div>

          <div className="card-glass" style={{ padding: '36px' }}>
            {error && (
              <div style={{ marginBottom: '20px' }}>
                <Alert type="error" message={error} onClose={() => setError(null)} />
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {!isLogin && (
                <InputField label="Full Name" icon="👤" type="text" name="name"
                  value={formData.name} onChange={handleChange} required placeholder="Your full name" />
              )}
              <InputField label="Email Address" icon="✉️" type="email" name="email"
                value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
              {!isLogin && (
                <InputField label="Age" icon="🎂" type="number" name="age"
                  value={formData.age} onChange={handleChange} required placeholder="Your age" min="13" max="100" />
              )}
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    🎯 Account Type
                  </label>
                  <select name="userType" value={formData.userType} onChange={handleChange}
                    className="input-field" style={{ cursor: 'pointer' }}>
                    <option value="student">Student (13–17)</option>
                    <option value="adult">Professional (18+)</option>
                  </select>
                </div>
              )}
              <InputField label="Password" icon="🔒" type="password" name="password"
                value={formData.password} onChange={handleChange} required placeholder="••••••••" />
              {!isLogin && (
                <InputField label="Confirm Password" icon="🔒" type="password" name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" />
              )}
              <button type="submit" className="btn-primary" disabled={loading}
                style={{ width: '100%', marginTop: '6px', padding: '14px', fontSize: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {loading ? <><Spinner size="sm" /> Processing...</> : isLogin ? '🚀 Sign In' : '✨ Create Account'}
              </button>
            </form>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              margin: '24px 0', color: 'var(--text-muted)', fontSize: '13px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span>{isLogin ? "Don't have an account?" : 'Already registered?'}</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <a href={isLogin ? '/register' : '/login'} style={{
              display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px',
              border: '1px solid var(--border-glow)', color: 'var(--blue-bright)',
              fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-glow)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {isLogin ? 'Create an account →' : '← Back to login'}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;