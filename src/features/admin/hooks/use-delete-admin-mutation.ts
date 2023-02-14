import { useMutation, UseMutationOptions } from "@tanstack/react-query";

function deleteOption(optionId: number) {
    return fetch(`/api/option/${optionId}`, {
        method: "delete",
        headers: {
        },
    });
}

export function useDeleteOptionMutation(
    options: UseMutationOptions<unknown, unknown, number>
) {
    return useMutation({
        mutationFn: deleteOption,
        ...options
    });
}
