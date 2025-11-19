"use client";

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

const STORAGE_KEY = 'antigravity-todo-app-data';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
            try {
                setTodos(JSON.parse(savedTodos));
            } catch (e) {
                console.error('Failed to parse todos from local storage', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever todos change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: Date.now(),
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const updateTodo = (id: string, text: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, text } : todo
        ));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        isLoaded
    };
};
