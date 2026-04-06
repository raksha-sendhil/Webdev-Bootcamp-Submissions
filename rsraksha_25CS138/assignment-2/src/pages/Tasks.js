import React, { useState, useMemo } from 'react';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';

const FILTERS = ['All', 'Pending', 'Done'];
const SORTS = ['Newest', 'Oldest', 'Priority', 'Category'];
const CATEGORIES = ['All', 'Dev', 'Design', 'Admin', 'Personal', 'Health', 'Other'];

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function Tasks({ tasks, onAdd, onToggle, onDelete, onUpdate }) {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let res = [...tasks];

    // Status filter
    if (filter === 'Pending') res = res.filter(t => !t.completed);
    if (filter === 'Done') res = res.filter(t => t.completed);

    // Category filter
    if (category !== 'All') res = res.filter(t => t.category === category);

    // Search
    if (search.trim()) res = res.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

    // Sort
    if (sort === 'Newest') res.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === 'Oldest') res.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === 'Priority') res.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    if (sort === 'Category') res.sort((a, b) => a.category.localeCompare(b.category));

    return res;
  }, [tasks, filter, sort, category, search]);

  const pending = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;

  return (
    <div style={{ padding: '88px 32px 48px', maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, animation: 'slideIn 0.3s ease' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 4,
        }}>
          Task Board
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--accent3)' }}>{pending}</span> pending · <span style={{ color: 'var(--success)' }}>{done}</span> done
        </p>
      </div>

      {/* Add task */}
      <AddTaskForm onAdd={onAdd} />

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        marginBottom: 24,
        padding: '16px 20px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
      }}>
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          style={{ flex: '1 1 200px', minWidth: 160 }}
        />

        {/* Status tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface2)', padding: 4, borderRadius: 8 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                background: filter === f ? 'var(--accent)' : 'transparent',
                color: filter === f ? 'var(--bg)' : 'var(--text2)',
                fontWeight: filter === f ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Category select */}
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: '0 0 auto' }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Sort select */}
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ flex: '0 0 auto' }}>
          {SORTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text3)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
          }}>
            {search ? `No tasks match "${search}"` : 'No tasks here — add one above!'}
          </div>
        ) : (
          filtered.map((task, i) => (
            <div key={task.id} style={{ animationDelay: `${i * 40}ms` }}>
              <TaskCard
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </div>
          ))
        )}
      </div>

      {/* Count */}
      {filtered.length > 0 && (
        <div style={{ marginTop: 20, textAlign: 'center', color: 'var(--text3)', fontSize: '0.75rem' }}>
          Showing {filtered.length} of {tasks.length} tasks
        </div>
      )}
    </div>
  );
}
