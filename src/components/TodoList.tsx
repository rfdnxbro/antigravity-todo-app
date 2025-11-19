"use client";

import React from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, text: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete, onUpdate }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">タスクはまだありません 🎉</p>
                <p className="text-gray-300 text-sm mt-1">新しいタスクを追加してみましょう！</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};
