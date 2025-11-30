"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, text: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleUpdate = () => {
        if (editText.trim()) {
            onUpdate(todo.id, editText.trim());
            setIsEditing(false);
        } else {
            setEditText(todo.text); // Revert if empty
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleUpdate();
        } else if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <div className={`
      group flex items-center justify-between p-5 mb-4 bg-white rounded-2xl border border-gray-100 transition-all duration-200
      ${todo.completed ? 'opacity-60' : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-0.5'}
    `}>
            <div className="flex items-center flex-1 gap-4 overflow-hidden">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${todo.completed ? 'bg-[#00E096] border-[#00E096]' : 'border-gray-300 hover:border-[#00E096]'}
          `}
                >
                    {todo.completed && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-gray-50 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100 text-slate-600 font-medium"
                    />
                ) : (
                    <span
                        onClick={() => !todo.completed && setIsEditing(true)}
                        className={`
              flex-1 truncate cursor-pointer select-none transition-colors font-medium
              ${todo.completed ? 'text-gray-400 line-through decoration-2 decoration-gray-200' : 'text-slate-600'}
            `}
                    >
                        {todo.text}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!isEditing && !todo.completed && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-gray-300 hover:text-slate-500 hover:bg-gray-50 rounded-lg transition-colors"
                        aria-label="編集"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                )}
                <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-gray-300 hover:text-[#FF80B5] hover:bg-pink-50 rounded-lg transition-colors"
                    aria-label="削除"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
