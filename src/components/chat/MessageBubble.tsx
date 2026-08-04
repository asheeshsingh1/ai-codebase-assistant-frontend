"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChatMessage } from "@/types/chat";
import Sources from "@/components/sources/Sources";

interface Props {
    message: ChatMessage;
}

export default function MessageBubble({
    message,
}: Props) {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`max-w-4xl rounded-xl px-4 py-3 ${
                    isUser
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-800 bg-slate-900"
                }`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap">
                        {message.content}
                    </p>
                ) : (
                    <>
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </div>

                        <Sources
                            citations={message.citations}
                        />
                    </>
                )}
            </div>
        </div>
    );
}