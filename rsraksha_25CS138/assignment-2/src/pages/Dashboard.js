import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FocusMode from '../components/FocusMode';

const CATEGORY_COLORS = {
  Dev: '#7c3aed',
  Design: '#ec4899',
  Admin: '#0ea5e9',
  Personal: '#f59e0b',
  Health: '#10b981',
  Other: '#6b7280',
};

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px 28px',
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        color: accent || 'var(--accent)',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ProgressRing({ pct, size = 80, stroke = 7, color = 'var(--accent)' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface2)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

export default function Dashboard({ tasks, onToggle, onDelete, onUpdate }) {
  const [showFocus, setShowFocus] = useState(false);
  const navigate = useNavigate();

  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed);
  const highPriority = pending.filter(t => t.priority === 'high').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  // Pick random task
  const [randomTask, setRandomTask] = useState(null);
  const pickRandom = () => {
    if (!pending.length) return;
    const r = pending[Math.floor(Math.random() * pending.length)];
    setRandomTask(r);
  };

  // Category breakdown
  const catMap = {};
  tasks.forEach(t => {
    if (!catMap[t.category]) catMap[t.category] = { total: 0, done: 0 };
    catMap[t.category].total++;
    if (t.completed) catMap[t.category].done++;
  });

  const recentPending = pending.slice(0, 4);

  return (
    <div style={{ padding: '88px 32px 48px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 40, animation: 'slideIn 0.4s ease' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: 8,
        }}>
          Good work,<br />
          <span style={{ color: 'var(--accent)' }}>let's flow.</span>
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        <StatCard label="Total Tasks" value={total} />
        <StatCard label="Completed" value={done} accent="var(--success)" />
        <StatCard label="Pending" value={pending.length} accent="var(--accent3)" />
        <StatCard label="High Priority" value={highPriority} accent="var(--danger)" sub="need attention" />
      </div>

      {/* Progress + Smart features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
        {/* Overall progress */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          animation: 'fadeIn 0.5s ease',
        }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <ProgressRing pct={pct} size={100} stroke={9} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>{pct}%</span>
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 4 }}>Overall Progress</h3>
            <p style={{ color: 'var(--text2)', fontSize: '0.8rem' }}>{done} of {total} tasks completed</p>
            <div style={{
              marginTop: 12,
              height: 6,
              background: 'var(--surface2)',
              borderRadius: 3,
              overflow: 'hidden',
              width: 160,
            }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: 'linear-gradient(90deg, var(--accent2), var(--accent))',
                borderRadius: 3,
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Smart actions */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          animation: 'fadeIn 0.6s ease',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16 }}>Smart Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => setShowFocus(true)}
              style={{
                padding: '10px 16px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>⚡</span> Enter Focus Mode
            </button>
            <button
              onClick={pickRandom}
              style={{
                padding: '10px 16px',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>🎲</span> Pick Random Task
            </button>
          </div>
          {randomTask && (
            <div style={{
              marginTop: 12,
              padding: '10px 14px',
              background: 'var(--accent2)22',
              border: '1px solid var(--accent2)44',
              borderRadius: 'var(--radius)',
              fontSize: '0.8rem',
              color: 'var(--text)',
              animation: 'fadeIn 0.2s ease',
            }}>
              <span style={{ color: 'var(--accent2)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Suggested → </span>
              {randomTask.title}
            </div>
          )}
        </div>
      </div>

      {/* Category breakdown + upcoming */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Categories */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          animation: 'fadeIn 0.6s ease',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 20 }}>By Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(catMap).map(([cat, data]) => {
              const catPct = data.total ? Math.round((data.done / data.total) * 100) : 0;
              const color = CATEGORY_COLORS[cat] || '#6b7280';
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>{cat}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{data.done}/{data.total}</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--surface2)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${catPct}%`,
                      background: color,
                      borderRadius: 3,
                      transition: 'width 0.8s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          animation: 'fadeIn 0.7s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Up Next</h3>
            <button
              onClick={() => navigate('/tasks')}
              style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
            >
              View all →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentPending.length === 0
              ? <p style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>All caught up! 🎉</p>
              : recentPending.map(t => (
                <div key={t.id} style={{
                  padding: '10px 14px',
                  background: 'var(--surface2)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  animation: 'fadeIn 0.3s ease',
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: t.priority === 'high' ? 'var(--danger)' : t.priority === 'medium' ? 'var(--accent3)' : 'var(--success)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.85rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>{t.category}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {showFocus && (
        <FocusMode
          tasks={tasks}
          onToggle={onToggle}
          onClose={() => setShowFocus(false)}
        />
      )}
    </div>
  );
}
