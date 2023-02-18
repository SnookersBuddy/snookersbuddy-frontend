import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {Option} from "../types/table-data";
import {Item} from "../../order/types/item";
import {Variant} from "../../order/types/configuration";
import {Assignment} from "../../order/types/assignment";
function updateOption(option: Option){
    const optionId = option.id;
    return fetch(`/api/option/${optionId}`, {
        method: "put",
        body: JSON.stringify(option),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useUpdateOptionMutation(
    options: UseMutationOptions<unknown, unknown, Option>) {
    return useMutation({
        mutationFn: updateOption,
        ...options
    });
}

function updateItem(item: Item){
    const itemId = item.id;
    return fetch(`/api/item/${itemId}`, {
        method: "put",
        body: JSON.stringify(item),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useUpdateItemMutation(
    options: UseMutationOptions<unknown, unknown, Item>) {
    return useMutation({
        mutationFn: updateItem,
        ...options
    });
}

function updateVariant(variant: Variant){
    const variantId = variant.id;
    return fetch(`/api/variant/${variantId}`, {
        method: "put",
        body: JSON.stringify(variant),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useUpdateVariantMutation(
    options: UseMutationOptions<unknown, unknown, Variant>) {
    return useMutation({
        mutationFn: updateVariant,
        ...options
    });
}

function updateAssignment(assignment: Assignment){
    const assignmentId = assignment.id;
    return fetch(`/api/assignment/${assignmentId}`, {
        method: "put",
        body: JSON.stringify(assignment),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useUpdateAssignmentMutation(
    options: UseMutationOptions<unknown, unknown, Assignment>) {
    return useMutation({
        mutationFn: updateAssignment,
        ...options
    });
}