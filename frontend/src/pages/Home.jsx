import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const FEATURES = [
  { icon: '🏆', title: 'Competitions', desc: 'Hackathons, coding contests & challenges with real prizes', color: 'var(--blue)' },
  { icon: '💼', title: 'Internships', desc: '1100+ curated opportunities at top companies', color: 'var(--purple)' },
  { icon: '🤖', title: 'AI Roadmap', desc: 'Personalized learning paths powered by AI', color: 'var(--cyan)' },
  { icon: '📚', title: 'Sahayak', desc: 'Your 24/7 multilingual AI learning assistant', color: '#10b981' },
];

export default function Home() {
  const { token } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflow: 'hidden', position: 'relative' }}>
      <Navbar />

      <div className="orb" style={{ width: 600, height: 600, top: -200, left: -200, background: 'rgba(59,130,246,0.12)' }} />
      <div className="orb" style={{ width: 500, height: 500, top: 100, right: -150, background: 'rgba(124,58,237,0.12)' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: 0, left: '40%', background: 'rgba(6,182,212,0.08)' }} />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px', animation: 'fadeInUp 0.5s ease both' }}>
          <span style={{
            padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.35)',
            color: 'var(--blue-bright)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px',
          }}>✦ Your Career Growth Platform</span>
        </div>

        <h1 style={{
          textAlign: 'center', margin: '0 0 24px',
          fontFamily: 'Orbitron, monospace', fontWeight: 900,
          fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', lineHeight: 1.1,
          animation: 'fadeInUp 0.6s 0.1s ease both', opacity: 0,
        }}>
          <span style={{ color: 'var(--text-primary)' }}>Unlock Your</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Full Potential</span>
        </h1>

        <p style={{
          textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px',
          color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7,
          animation: 'fadeInUp 0.6s 0.2s ease both', opacity: 0,
        }}>
          Competitions, internships, AI-powered roadmaps and a smart assistant — everything you need to build a career that matters.
        </p>

        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeInUp 0.6s 0.3s ease both', opacity: 0,
        }}>
          {token ? (
            <a href="/dashboard" style={{
              padding: '14px 36px', borderRadius: '12px', background: 'var(--gradient-primary)',
              color: '#fff', fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 8px 30px var(--blue-glow)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px var(--purple-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px var(--blue-glow)'; }}>
              🚀 Go to Dashboard
            </a>
          ) : (
            <>
              <a href="/register" style={{
                padding: '14px 36px', borderRadius: '12px', background: 'var(--gradient-primary)',
                color: '#fff', fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 8px 30px var(--blue-glow)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px var(--purple-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px var(--blue-glow)'; }}>
                Get Started Free
              </a>
              <a href="/login" style={{
                padding: '13px 36px', borderRadius: '12px', background: 'transparent',
                color: 'var(--blue-bright)', fontWeight: 700, fontSize: '1rem',
                border: '1px solid var(--border-glow)', transition: 'all 0.2s', display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-glow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Sign In
              </a>
            </>
          )}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px', margin: '72px 0 48px',
          animation: 'fadeInUp 0.6s 0.4s ease both', opacity: 0,
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border))' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>What we offer</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--border))' }} />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px',
          animation: 'fadeInUp 0.6s 0.5s ease both', opacity: 0,
        }}>
          {FEATURES.map(({ icon, title, desc, color }) => (
            <div key={title} className="card-glass" style={{ padding: '28px 24px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: `${color}18`, border: `1px solid ${color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '16px',
              }}>{icon}</div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Orbitron, monospace' }}>{title}</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap',
          marginTop: '72px', paddingTop: '48px', borderTop: '1px solid var(--border)',
          animation: 'fadeInUp 0.6s 0.6s ease both', opacity: 0,
        }}>
          {[
            { num: '1100+', label: 'Internships' },
            { num: '8+', label: 'Competitions' },
            { num: '3', label: 'Languages' },
            { num: '24/7', label: 'AI Support' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '2rem',
                background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{num}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500, marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{
        position: 'relative', zIndex: 1, textAlign: 'center', padding: '24px',
        color: 'var(--text-muted)', fontSize: '13px', borderTop: '1px solid var(--border)',
      }}>
        Margadarshak — Empowering Students · Building Futures
      </footer>
    </div>
  );
}