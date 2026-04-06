import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const { tasks, addTask, deleteTask, toggleTask, updateTask } = useTasks();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              onAdd={addTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
