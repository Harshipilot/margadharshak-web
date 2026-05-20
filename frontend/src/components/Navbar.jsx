import React, { useState, useEffect } from 'react';

export const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(5, 8, 18, 0.92)' : 'rgba(5, 8, 18, 0.6)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.3s',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', background: 'var(--gradient-primary)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', boxShadow: '0 4px 15px var(--blue-glow)',
          }}>🎓</div>
          <span style={{
            fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.1rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.5px',
          }}>Margadarshak</span>
        </a>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Sahayak', href: '/sahayak' },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              padding: '6px 16px', borderRadius: '8px', color: 'var(--text-secondary)',
              fontSize: '14px', fontWeight: 500, transition: 'all 0.2s', border: '1px solid transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--blue-bright)';
              e.currentTarget.style.background = 'var(--blue-glow)';
              e.currentTarget.style.borderColor = 'var(--border-glow)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{
                fontSize: '13px', color: 'var(--text-secondary)', padding: '4px 12px',
                borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)',
              }}>👤 {user.name}</span>
              <button onClick={onLogout} style={{
                padding: '7px 18px', borderRadius: '9px', background: 'rgba(239,68,68,0.1)',
                color: '#f87171', border: '1px solid rgba(239,68,68,0.3)',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={{
                padding: '7px 18px', borderRadius: '9px', color: 'var(--blue-bright)',
                border: '1px solid var(--border-glow)', fontWeight: 600, fontSize: '13px',
                transition: 'all 0.2s', display: 'block',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-glow)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                Login
              </a>
              <a href="/register" style={{
                padding: '7px 18px', borderRadius: '9px', background: 'var(--gradient-primary)',
                color: '#fff', fontWeight: 600, fontSize: '13px',
                boxShadow: '0 4px 15px var(--blue-glow)', transition: 'all 0.2s', display: 'block',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;