"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChatMessage } from "@/types/chat";

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
                    <div className="prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}

                {message.citations &&
                    message.citations.length > 0 && (
                        <div className="mt-4 border-t border-slate-700 pt-3">
                            <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                                Sources
                            </p>

                            <div className="space-y-2">
                                {message.citations.map(
                                    (citation, index) => (
                                        <div
                                            key={index}
                                            className="rounded-md bg-slate-800 px-3 py-2 text-sm"
                                        >
                                            <div className="font-medium">
                                                {citation.file_path}
                                            </div>

                                            <div className="text-slate-400">
                                                Lines{" "}
                                                {citation.start_line}
                                                –
                                                {citation.end_line}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}