"use client";

import { useEffect, useState } from "react";

import { useRepository } from "@/context/RepositoryContext";
import { useChat } from "@/hooks/useChat";
import { useMessages } from "@/hooks/useMessages";

import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

import { ChatMessage } from "@/types/chat";

export default function ChatWindow() {
    const { selectedRepository } = useRepository();

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const chatMutation = useChat();

    const {
        data: history = [],
        isLoading: historyLoading,
    } = useMessages(selectedRepository?.id);

    useEffect(() => {
        setMessages(history);
    }, [history]);

    async function handleSend(question: string) {
        if (!selectedRepository) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: question,
            citations: null,
        };

        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await chatMutation.mutateAsync({
                repositoryId: selectedRepository.id,
                question,
            });

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: response.answer,
                citations: response.citations,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                        "Sorry, something went wrong while answering your question.",
                    citations: [],
                },
            ]);
        }
    }

    if (!selectedRepository) {
        return (
            <div className="flex h-full items-center justify-center text-slate-400">
                Select a repository to begin chatting.
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-slate-800 p-5">
                <h2 className="text-xl font-semibold">
                    Repository: {selectedRepository.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    URL: "{selectedRepository.git_url}"
                </p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {historyLoading ? (
                    <div className="p-6 text-slate-400">
                        Loading chat history...
                    </div>
                ) : (
                    <MessageList messages={messages} />
                )}
            </div>

            <ChatInput
                onSend={handleSend}
                isLoading={chatMutation.isPending}
            />
        </div>
    );
}