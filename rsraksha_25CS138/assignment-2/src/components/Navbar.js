import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 32px',
  height: '64px',
  background: 'rgba(10,10,15,0.85)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid var(--border)',
};

const logoStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 800,
  fontSize: '1.3rem',
  letterSpacing: '-0.03em',
  color: 'var(--text)',
};

const dotStyle = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: 'var(--accent)',
  marginLeft: 4,
  verticalAlign: 'middle',
  marginBottom: 2,
};

const linksStyle = {
  display: 'flex',
  gap: 4,
};

const linkBase = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  fontWeight: 500,
  padding: '6px 16px',
  borderRadius: 8,
  color: 'var(--text2)',
  transition: 'all 0.2s',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        FlowState<span style={dotStyle} />
      </div>
      <div style={linksStyle}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? 'var(--bg)' : 'var(--text2)',
            background: isActive ? 'var(--accent)' : 'transparent',
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          style={({ isActive }) => ({
            ...linkBase,
            color: isActive ? 'var(--bg)' : 'var(--text2)',
            background: isActive ? 'var(--accent)' : 'transparent',
          })}
        >
          Tasks
        </NavLink>
      </div>
    </nav>
  );
}
