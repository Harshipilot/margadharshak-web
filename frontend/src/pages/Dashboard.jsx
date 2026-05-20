import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardNavbar = ({ navigate, logout }) => (
  <nav style={{
    background: 'rgba(5,8,18,0.92)', backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)', padding: '0 24px', height: '64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '18px', boxShadow: '0 4px 15px var(--blue-glow)',
      }}>🎓</div>
      <span style={{
        fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '1.05rem',
        background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Margadarshak</span>
    </div>

    <div style={{ display: 'flex', gap: '8px' }}>
      {[
        { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { label: 'AI Roadmap', path: '/ai-roadmap', icon: '🤖' },
        { label: 'Sahayak', path: '/sahayak', icon: '📚' },
      ].map(({ label, path, icon }) => (
        <button key={label} onClick={() => navigate(path)} style={{
          padding: '7px 16px', borderRadius: '8px', background: 'transparent',
          color: 'var(--text-secondary)', border: '1px solid transparent',
          fontWeight: 500, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue-bright)'; e.currentTarget.style.background = 'var(--blue-glow)'; e.currentTarget.style.borderColor = 'var(--border-glow)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}>
          {icon} {label}
        </button>
      ))}
    </div>

    <button onClick={() => { logout(); navigate('/login'); }} style={{
      padding: '7px 18px', borderRadius: '9px', background: 'rgba(239,68,68,0.1)',
      color: '#f87171', border: '1px solid rgba(239,68,68,0.3)',
      fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>
      Logout
    </button>
  </nav>
);

const ActionCard = ({ icon, title, desc, btnLabel, onClick, accentColor, badge }) => (
  <div className="card-glass" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: `${accentColor}18`, border: `1px solid ${accentColor}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
      }}>{icon}</div>
      {badge && (
        <span style={{
          padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
          background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}40`,
        }}>{badge}</span>
      )}
    </div>
    <div>
      <h3 style={{ margin: '0 0 6px', fontFamily: 'Orbitron, monospace', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{desc}</p>
    </div>
    {onClick && (
      <button onClick={onClick} style={{
        padding: '10px 20px', borderRadius: '9px', cursor: 'pointer',
        background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}40`,
        fontWeight: 600, fontSize: '13px', transition: 'all 0.2s', marginTop: 'auto',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}35`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${accentColor}22`; e.currentTarget.style.transform = 'translateY(0)'; }}>
        {btnLabel} →
      </button>
    )}
  </div>
);

const LinkCard = ({ icon, title, desc, links, accentColor }) => (
  <div className="card-glass" style={{ padding: '28px' }}>
    <div style={{
      width: '48px', height: '48px', borderRadius: '13px',
      background: `${accentColor}18`, border: `1px solid ${accentColor}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '22px', marginBottom: '14px',
    }}>{icon}</div>
    <h3 style={{ margin: '0 0 6px', fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
    <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>{desc}</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {links.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
          padding: '9px 14px', borderRadius: '8px', background: `${accentColor}12`,
          color: accentColor, border: `1px solid ${accentColor}30`,
          fontSize: '13px', fontWeight: 600, transition: 'all 0.2s', display: 'block',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}25`; e.currentTarget.style.transform = 'translateX(4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = `${accentColor}12`; e.currentTarget.style.transform = 'translateX(0)'; }}>
          ↗ {label}
        </a>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const age = storedUser.age || 0;
  const ageGroup = age >= 18 ? '17plus' : 'under17';

  const gridStyle = {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px', animation: 'fadeInUp 0.5s 0.15s ease both', opacity: 0,
  };

  const heroStyle = {
    marginBottom: '40px', padding: '32px 36px', borderRadius: '20px',
    background: 'var(--gradient-glow)', border: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
    animation: 'fadeInUp 0.5s ease both',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: -100, right: -100, background: 'rgba(124,58,237,0.1)' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: 100, left: -100, background: 'rgba(59,130,246,0.08)' }} />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      <DashboardNavbar navigate={navigate} logout={logout} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

        {ageGroup === 'under17' && (
          <>
            <div style={heroStyle}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0,
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
                boxShadow: '0 8px 25px rgba(16,185,129,0.3)',
              }}>📚</div>
              <div>
                <h1 style={{ margin: '0 0 6px', fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                  Student Dashboard
                  <span style={{ marginLeft: '12px', padding: '3px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', verticalAlign: 'middle' }}>
                    Age {age}
                  </span>
                </h1>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Here are learning resources and opportunities designed just for you!
                </p>
              </div>
            </div>

            <div style={gridStyle}>
              <LinkCard icon="📝" title="Homework Help" accentColor="#f59e0b"
                desc="Get help with school assignments and projects"
                links={[{ label: 'Khan Academy', href: 'https://www.khanacademy.org/' }, { label: 'Chegg Study', href: 'https://www.chegg.com/study' }]} />
              <LinkCard icon="🎓" title="Learning Resources" accentColor="#06b6d4"
                desc="Free courses and tutorials to expand your knowledge"
                links={[{ label: 'Coursera for Students', href: 'https://www.coursera.org/courses?query=high%20school' }, { label: 'edX High School', href: 'https://www.edx.org/high-school' }]} />
              <LinkCard icon="💻" title="Learn Programming" accentColor="#f87171"
                desc="Start your coding journey with beginner platforms"
                links={[{ label: 'Scratch Programming', href: 'https://scratch.mit.edu/' }, { label: 'Codecademy', href: 'https://www.codecademy.com/learn' }]} />
              <LinkCard icon="🛠" title="Study Tools" accentColor="#a78bfa"
                desc="Productivity tools to organize your studies"
                links={[{ label: 'Quizlet', href: 'https://quizlet.com/' }, { label: 'Notion Templates', href: 'https://www.notion.so/templates/category/school' }]} />
              <LinkCard icon="🏆" title="Student Competitions" accentColor="#10b981"
                desc="Age-appropriate contests for school students"
                links={[{ label: 'Coding Competitions', href: 'https://www.codingal.com/competitions/' }, { label: 'Math Contests', href: 'https://www.mathcounts.org/' }]} />
              <LinkCard icon="🚀" title="Career Exploration" accentColor="#fb923c"
                desc="Discover career paths that interest you"
                links={[{ label: 'Career Interest Quiz', href: 'https://www.mynextmove.org/explore/ip' }, { label: 'Career Guide (BLS)', href: 'https://www.bls.gov/k12/' }]} />
              <ActionCard icon="🤖" title="AI Roadmap" accentColor="#7c3aed"
                desc="Get personalized career roadmaps for AI, Web Dev, Cybersecurity and more!"
                btnLabel="Generate My Roadmap" badge="Powered by AI"
                onClick={() => navigate('/ai-roadmap')} />
            </div>

            <div className="card-glass" style={{
              marginTop: '24px', padding: '20px 28px',
              animation: 'fadeInUp 0.5s 0.3s ease both', opacity: 0,
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <span style={{ fontSize: '22px' }}>💡</span>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--blue-bright)' }}>Pro Tip:</strong> Focus on building strong foundations now.
                Internships and professional competitions unlock when you turn 18!
              </p>
            </div>
          </>
        )}

        {ageGroup === '17plus' && (
          <>
            <div style={heroStyle}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px', flexShrink: 0,
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
                boxShadow: '0 8px 25px var(--blue-glow)',
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}>🎯</div>
              <div>
                <h1 style={{ margin: '0 0 6px', fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                  Professional Dashboard
                  <span style={{ marginLeft: '12px', padding: '3px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, background: 'var(--blue-glow)', color: 'var(--blue-bright)', border: '1px solid var(--border-glow)', verticalAlign: 'middle' }}>
                    Age {age}
                  </span>
                </h1>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                  You're eligible for professional opportunities, competitions, and internships!
                </p>
              </div>
            </div>

            <div style={gridStyle}>
              <ActionCard icon="🏆" title="Competitions" accentColor="#3b82f6"
                desc="Hackathons, coding contests and challenges with prizes up to $150k"
                btnLabel="Explore Competitions" badge="8 Active"
                onClick={() => navigate('/competitions')} />
              <ActionCard icon="💼" title="Internships" accentColor="#7c3aed"
                desc="1100+ engineering internships with stipends up to ₹80k/month"
                btnLabel="Find Internships" badge="1100+ Live"
                onClick={() => navigate('/internships')} />
              <ActionCard icon="🤖" title="AI Roadmap" accentColor="#06b6d4"
                desc="Personalized step-by-step learning paths for your dream career"
                btnLabel="Generate Roadmap" badge="Powered by AI"
                onClick={() => navigate('/ai-roadmap')} />
              <LinkCard icon="📚" title="Advanced Learning" accentColor="#10b981"
                desc="Professional certifications to boost your career"
                links={[{ label: 'Coursera Certificates', href: 'https://www.coursera.org/professional-certificates' }, { label: 'Udemy Courses', href: 'https://www.udemy.com/' }]} />
              <LinkCard icon="🤝" title="Professional Network" accentColor="#f59e0b"
                desc="Build your network and connect with industry experts"
                links={[{ label: 'LinkedIn', href: 'https://www.linkedin.com/' }, { label: 'GitHub Portfolio', href: 'https://github.com/' }]} />
              <LinkCard icon="🔐" title="Job Boards" accentColor="#fb923c"
                desc="Latest tech job openings across top companies"
                links={[{ label: 'Wellfound (AngelList)', href: 'https://wellfound.com/jobs' }, { label: 'Naukri Tech Jobs', href: 'https://www.naukri.com/technology-jobs' }]} />
            </div>

            <div style={{
              marginTop: '24px', padding: '28px 36px', borderRadius: '16px',
              background: 'var(--gradient-glow)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '16px',
              animation: 'fadeInUp 0.5s 0.3s ease both', opacity: 0,
            }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontFamily: 'Orbitron, monospace', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  🚀 Ready to Take the Next Step?
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>
                  Build your career — explore competitions, apply for internships, start networking!
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => navigate('/competitions')}
                  style={{ padding: '10px 22px', fontSize: '13px' }}>
                  Browse Competitions
                </button>
                <button className="btn-ghost" onClick={() => navigate('/internships')}
                  style={{ padding: '10px 22px', fontSize: '13px' }}>
                  Find Internships
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}