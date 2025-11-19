"use client";

import React, { useState } from 'react';

interface AddTodoFormProps {
    onAdd: (text: string) => void;
}

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 relative">
            <div className="relative group">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="新しいタスクを追加..."
                    className="w-full p-5 pr-24 rounded-2xl bg-[#FDFDFF] border-2 border-gray-100 focus:border-pink-200 focus:outline-none focus:ring-4 focus:ring-pink-50 transition-all text-slate-600 placeholder-gray-300 font-medium"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="absolute right-3 top-3 bottom-3 px-6 bg-[#FF99C2] hover:bg-[#FF80B5] text-white rounded-xl font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm hover:shadow-md"
                >
                    ADD
                </button>
            </div>
        </form>
    );
};
