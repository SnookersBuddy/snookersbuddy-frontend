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

function deleteAssignment(assignmentId: number) {
    return fetch(`/api/assignment/${assignmentId}`, {
        method: "delete",
        headers: {
        },
    });
}

export function useDeleteAssignmentMutation(
    options: UseMutationOptions<unknown, unknown, number>
) {
    return useMutation({
        mutationFn: deleteAssignment,
        ...options
    });
}

function deleteItem(itemId: number) {
    return fetch(`/api/item/${itemId}`, {
        method: "delete",
        headers: {
        },
    });
}

export function useDeleteItemMutation(
    options: UseMutationOptions<unknown, unknown, number>
) {
    return useMutation({
        mutationFn: deleteItem,
        ...options
    });
}

function deleteVariant(variantId: number) {
    return fetch(`/api/variant/${variantId}`, {
        method: "delete",
        headers: {
        },
    });
}

export function useDeleteVariantMutation(
    options: UseMutationOptions<unknown, unknown, number>
) {
    return useMutation({
        mutationFn: deleteVariant,
        ...options
    });
}
