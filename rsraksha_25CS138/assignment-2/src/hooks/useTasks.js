import { useState, useEffect } from 'react';

const STORAGE_KEY = 'flowstate_tasks';

const defaultTasks = [
  { id: '1', title: 'Design landing page mockup', category: 'Design', priority: 'high', completed: false, createdAt: Date.now() - 86400000 },
  { id: '2', title: 'Review pull requests', category: 'Dev', priority: 'medium', completed: true, createdAt: Date.now() - 72000000 },
  { id: '3', title: 'Write weekly report', category: 'Admin', priority: 'low', completed: false, createdAt: Date.now() - 43200000 },
  { id: '4', title: 'Fix login bug', category: 'Dev', priority: 'high', completed: false, createdAt: Date.now() - 21600000 },
  { id: '5', title: 'Team standup notes', category: 'Admin', priority: 'medium', completed: true, createdAt: Date.now() - 3600000 },
];

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultTasks;
    } catch {
      return defaultTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      completed: false,
      ...task,
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return { tasks, addTask, deleteTask, toggleTask, updateTask };
}
