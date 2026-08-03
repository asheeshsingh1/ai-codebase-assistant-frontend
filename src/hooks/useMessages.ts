import { useQuery } from "@tanstack/react-query";

import { getChatHistory } from "@/services/chat.service";

export function useMessages(
    repositoryId?: string,
) {
    return useQuery({
        queryKey: ["messages", repositoryId],
        queryFn: () => getChatHistory(repositoryId!),
        enabled: !!repositoryId,
    });
}