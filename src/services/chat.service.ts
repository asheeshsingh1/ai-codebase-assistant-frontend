import { api } from "./api";
import {
    ChatMessage,
    ChatResponse,
} from "@/types/chat";

export async function askRepository(
    repositoryId: string,
    question: string,
): Promise<ChatResponse> {
    const response = await api.post(
        `/repositories/${repositoryId}/chat`,
        {
            question,
        },
    );

    return response.data;
}

interface ChatHistoryResponse {
    messages: ChatMessage[];
}

export async function getChatHistory(
    repositoryId: string,
): Promise<ChatMessage[]> {
    const response = await api.get<ChatHistoryResponse>(
        `/repositories/${repositoryId}/messages`,
    );

    return response.data.messages;
}