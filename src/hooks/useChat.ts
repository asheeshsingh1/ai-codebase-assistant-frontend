import { useMutation } from "@tanstack/react-query";

import { askRepository } from "@/services/chat.service";

interface ChatRequest {
    repositoryId: string;
    question: string;
}

export function useChat() {
    return useMutation({
        mutationFn: ({
            repositoryId,
            question,
        }: ChatRequest) =>
            askRepository(
                repositoryId,
                question,
            ),
    });
}