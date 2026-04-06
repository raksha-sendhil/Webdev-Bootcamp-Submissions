import React, { useState } from 'react';

const CATEGORIES = ['Dev', 'Design', 'Admin', 'Personal', 'Health', 'Other'];
const PRIORITIES = ['high', 'medium', 'low'];

export default function AddTaskForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dev');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category, priority });
    setTitle('');
    setOpen(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border)',
            color: 'var(--text3)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)'; }}
        >
          <span style={{ fontSize: '1.1rem' }}>+</span> Add new task
        </button>
      ) : (
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleKey}
            placeholder="What needs to be done?"
            style={{ width: '100%', marginBottom: 12, fontSize: '0.95rem', padding: '10px 14px' }}
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ flex: 1, minWidth: 120 }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              style={{ flex: 1, minWidth: 120 }}
            >
              {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)} Priority</option>)}
            </select>
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 24px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Add
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: '10px 16px',
                background: 'var(--surface2)',
                borderRadius: 'var(--radius)',
                color: 'var(--text2)',
                fontSize: '0.85rem',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
