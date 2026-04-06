import React, { useState } from 'react';

const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f97316',
  low: '#22c55e',
};

const CATEGORY_COLORS = {
  Dev: '#7c3aed',
  Design: '#ec4899',
  Admin: '#0ea5e9',
  Personal: '#f59e0b',
  Health: '#10b981',
  Other: '#6b7280',
};

export default function TaskCard({ task, onToggle, onDelete, onUpdate, compact }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (editing && editTitle.trim()) {
      onUpdate(task.id, { title: editTitle.trim() });
    }
    setEditing(!editing);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') { setEditing(false); setEditTitle(task.title); }
  };

  const priorityColor = PRIORITY_COLORS[task.priority] || '#6b7280';
  const categoryColor = CATEGORY_COLORS[task.category] || '#6b7280';

  const cardStyle = {
    background: 'var(--surface)',
    border: `1px solid ${task.completed ? 'var(--border)' : 'var(--border)'}`,
    borderLeft: `3px solid ${task.completed ? 'var(--text3)' : priorityColor}`,
    borderRadius: 'var(--radius)',
    padding: compact ? '12px 16px' : '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'all 0.2s',
    opacity: task.completed ? 0.55 : 1,
    animation: 'fadeIn 0.3s ease',
  };

  return (
    <div style={cardStyle}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `2px solid ${task.completed ? 'var(--accent)' : 'var(--border)'}`,
          background: task.completed ? 'var(--accent)' : 'transparent',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        {task.completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {editing ? (
          <input
            autoFocus
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: '100%', padding: '4px 8px', fontSize: '0.875rem' }}
          />
        ) : (
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 400,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'var(--text3)' : 'var(--text)',
              fontFamily: 'var(--font-mono)',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Tags */}
      {!compact && (
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: 20,
            background: categoryColor + '22',
            color: categoryColor,
            border: `1px solid ${categoryColor}44`,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
          }}>
            {task.category}
          </span>
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: 20,
            background: priorityColor + '22',
            color: priorityColor,
            border: `1px solid ${priorityColor}44`,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
          }}>
            {task.priority}
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        <button
          onClick={handleEdit}
          title={editing ? 'Save' : 'Edit'}
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: editing ? 'var(--accent)22' : 'transparent',
            color: editing ? 'var(--accent)' : 'var(--text3)',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
          }}
        >
          {editing ? '✓' : '✎'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          title="Delete"
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: 'transparent',
            color: 'var(--text3)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = '#ef444422'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'transparent'; }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
