import { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";

interface Props {
    messages: ChatMessage[];
}

export default function MessageList({
    messages,
}: Props) {
    return (
        <div className="space-y-4 p-6">
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    );
}