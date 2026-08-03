import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRepository } from "@/services/repository";

export function useCreateRepository() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRepository,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["repositories"],
            });
        },
    });
}