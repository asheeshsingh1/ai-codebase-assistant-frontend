"use client";

import { useState } from "react";

interface Props {
    onSend: (question: string) => void;
    isLoading?: boolean;
}

export default function ChatInput({
    onSend,
    isLoading = false,
}: Props) {
    const [question, setQuestion] = useState("");

    function handleSubmit() {
        const value = question.trim();

        if (!value || isLoading) return;

        onSend(value);
        setQuestion("");
    }

    return (
        <div className="border-t border-slate-800 p-4">
            <div className="flex gap-3">
                <input
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-indigo-500"
                    placeholder="Ask about this repository..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                />

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500 disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
}