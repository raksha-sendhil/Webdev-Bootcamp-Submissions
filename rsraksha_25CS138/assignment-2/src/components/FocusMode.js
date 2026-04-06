import React, { useState, useEffect, useCallback } from 'react';

export default function FocusMode({ tasks, onToggle, onClose }) {
  const pending = tasks.filter(t => !t.completed);
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const current = pending[idx];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(id); setRunning(false); setDone(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const format = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const progress = ((25 * 60 - seconds) / (25 * 60)) * 100;

  const handleComplete = () => {
    if (current) onToggle(current.id);
    if (idx < pending.length - 1) {
      setIdx(i => i + 1);
      setSeconds(25 * 60);
      setRunning(false);
      setDone(false);
    } else {
      onClose();
    }
  };

  const skip = () => {
    if (idx < pending.length - 1) {
      setIdx(i => i + 1);
      setSeconds(25 * 60);
      setRunning(false);
      setDone(false);
    }
  };

  if (!current) return (
    <Overlay onClose={onClose}>
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', marginBottom: 8 }}>All Done!</h2>
        <p style={{ color: 'var(--text2)', marginBottom: 24 }}>No pending tasks. Great work!</p>
        <button onClick={onClose} style={btnStyle}>Close Focus Mode</button>
      </div>
    </Overlay>
  );

  return (
    <Overlay onClose={onClose}>
      <div style={{ textAlign: 'center', padding: '40px 32px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Focus Mode · Task {idx + 1} of {pending.length}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
          color: 'var(--text)',
          marginBottom: 32,
          maxWidth: 400,
          margin: '0 auto 32px',
        }}>
          {current.title}
        </h2>

        {/* Timer circle */}
        <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto 32px' }}>
          <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--surface2)" strokeWidth="8" />
            <circle
              cx="90" cy="90" r="80"
              fill="none"
              stroke={done ? 'var(--accent)' : 'var(--accent2)'}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <span style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: done ? 'var(--accent)' : 'var(--text)' }}>
              {done ? '✓' : format(seconds)}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {done ? 'pomodoro done' : running ? 'focusing' : 'paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {!done && (
            <button
              onClick={() => setRunning(r => !r)}
              style={{ ...btnStyle, background: running ? 'var(--surface2)' : 'var(--accent)', color: running ? 'var(--text)' : 'var(--bg)' }}
            >
              {running ? '⏸ Pause' : '▶ Start'}
            </button>
          )}
          <button onClick={handleComplete} style={btnStyle}>
            ✓ Mark Done
          </button>
          {idx < pending.length - 1 && (
            <button onClick={skip} style={{ ...btnStyle, background: 'var(--surface2)', color: 'var(--text2)' }}>
              Skip →
            </button>
          )}
        </div>

        {/* Upcoming */}
        {idx < pending.length - 1 && (
          <div style={{ marginTop: 32, padding: '12px 16px', background: 'var(--surface2)', borderRadius: 'var(--radius)', textAlign: 'left' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Up next</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{pending[idx + 1]?.title}</div>
          </div>
        )}
      </div>
    </Overlay>
  );
}

function Overlay({ children, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: 520,
        position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'var(--surface2)',
            color: 'var(--text2)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >✕</button>
        {children}
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '10px 22px',
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
};
