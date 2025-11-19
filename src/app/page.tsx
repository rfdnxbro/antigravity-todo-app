"use client";

import { useTodos } from '@/hooks/useTodos';
import { Header } from '@/components/Header';
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoList } from '@/components/TodoList';

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, isLoaded } = useTodos();

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <main className="min-h-screen bg-[#FDFDFF] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-lg">
        <Header />

        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
          <AddTodoForm onAdd={addTodo} />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 className="text-xl font-bold text-slate-700">Tasks</h2>
              <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                {todos.filter(t => !t.completed).length} remaining
              </span>
            </div>

            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-xs font-medium tracking-wide">
          <p>© 2025 TODO POP</p>
        </footer>
      </div>
    </main>
  );
}
