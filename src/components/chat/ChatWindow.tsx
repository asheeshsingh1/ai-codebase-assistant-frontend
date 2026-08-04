"use client";

import { useRepository } from "@/context/RepositoryContext";
import { useConversation } from "@/hooks/useConversation";

import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatWindow() {
    const { selectedRepository } = useRepository();

    const {
        messages,
        sendMessage,
        historyLoading,
        sending,
    } = useConversation(selectedRepository?.id);

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
                    URL: {selectedRepository.git_url}
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
                onSend={sendMessage}
                isLoading={sending}
            />
        </div>
    );
}