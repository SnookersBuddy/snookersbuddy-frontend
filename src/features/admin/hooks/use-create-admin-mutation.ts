import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {Option} from "../types/table-data";
import {Item} from "../../order/types/item";
import {Variant} from "../../order/types/configuration";
import {Assignment} from "../../order/types/assignment";

function createOption(option: Option){
    const optionId = option.id;
    return fetch(`/api/option`, {
        method: "post",
        body: JSON.stringify(option),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useCreateOptionMutation(
    options: UseMutationOptions<unknown, unknown, Option>) {
    return useMutation({
        mutationFn: createOption,
        ...options
    });
}

function createItem(item: Item){
    const itemId = item.id;
    return fetch(`/api/item/${itemId}`, {
        method: "post",
        body: JSON.stringify(item),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useCreateItemMutation(
    options: UseMutationOptions<unknown, unknown, Item>) {
    return useMutation({
        mutationFn: createItem,
        ...options
    });
}

function createVariant(variant: Variant){
    const variantId = variant.id;
    return fetch(`/api/variant/${variantId}`, {
        method: "post",
        body: JSON.stringify(variant),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useCreateVariantMutation(
    options: UseMutationOptions<unknown, unknown, Variant>) {
    return useMutation({
        mutationFn: createVariant,
        ...options
    });
}

function createAssignment(assignment: Assignment){
    const assignmentId = assignment.id;
    return fetch(`/api/assignment/${assignmentId}`, {
        method: "post",
        body: JSON.stringify(assignment),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function useCreateAssignmentMutation(
    options: UseMutationOptions<unknown, unknown, Assignment>) {
    return useMutation({
        mutationFn: createAssignment,
        ...options
    });
}