import { useEffect, useState } from "react";

import { useChat } from "./useChat";
import { useMessages } from "./useMessages";

import { ChatMessage } from "@/types/chat";

export function useConversation(
    repositoryId?: string,
) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const chatMutation = useChat();

    const {
        data: history,
        isLoading: historyLoading,
    } = useMessages(repositoryId);

    useEffect(() => {
        if (!repositoryId) {
            setMessages([]);
            return;
        }

        if (history) {
            setMessages(history);
        }
    }, [repositoryId, history]);

    async function sendMessage(
        question: string,
    ) {
        if (!repositoryId) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: question,
            citations: null,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        try {
            const response =
                await chatMutation.mutateAsync({
                    repositoryId,
                    question,
                });

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: response.answer,
                citations: response.citations,
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);
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

    return {
        messages,
        sendMessage,
        historyLoading,
        sending: chatMutation.isPending,
    };
}