import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base = 'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'btn-primary',
    secondary: 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-glow)] hover:bg-[var(--bg-card-hover)]',
    success:  'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.35)]',
    danger:   'bg-red-600 text-white hover:bg-red-500 shadow-[0_4px_20px_rgba(239,68,68,0.35)]',
    outline:  'btn-ghost',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', glow = false, ...props }) => (
  <div
    className={`card-glass p-6 ${glow ? 'shadow-[0_0_30px_var(--blue-glow)]' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const Badge = ({ children, variant = 'blue', className = '' }) => {
  const variants = {
    blue:   'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    green:  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
    red:    'bg-red-500/15 text-red-400 border border-red-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    gray:   'bg-slate-500/15 text-slate-400 border border-slate-500/30',
    cyan:   'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
         style={{ animation: 'fadeIn 0.2s ease' }}>
      <div className={`card-glass ${sizes[size]} w-full`}
           style={{ animation: 'fadeInUp 0.25s ease' }}>
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-bold font-display text-gradient">{title}</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-all text-xl">
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const Spinner = ({ size = 'md' }) => {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-[3px]', lg: 'w-12 h-12 border-4' };
  return (
    <div className={`${sizes[size]} border-white/20 border-t-[var(--blue)] rounded-full animate-spin`} />
  );
};

export const Alert = ({ type = 'info', title, message, onClose }) => {
  const types = {
    info:    { cls: 'bg-blue-500/10 border-blue-500/30 text-blue-300',    icon: 'ℹ️' },
    success: { cls: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', icon: '✅' },
    warning: { cls: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300', icon: '⚠️' },
    error:   { cls: 'bg-red-500/10 border-red-500/30 text-red-300',       icon: '❌' },
  };
  const { cls, icon } = types[type];
  return (
    <div className={`border rounded-xl p-4 flex items-start gap-3 ${cls}`}
         style={{ animation: 'fadeInUp 0.2s ease' }}>
      <span>{icon}</span>
      <div className="flex-1">
        {title && <p className="font-bold text-sm mb-0.5">{title}</p>}
        {message && <p className="text-sm opacity-80">{message}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity text-lg leading-none">×</button>
      )}
    </div>
  );
};

export default { Button, Card, Badge, Modal, Spinner, Alert };