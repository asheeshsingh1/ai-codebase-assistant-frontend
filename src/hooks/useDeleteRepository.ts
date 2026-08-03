import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteRepository } from "@/services/repository";

export function useDeleteRepository() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRepository,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["repositories"],
            });
        },
    });
}