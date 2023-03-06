import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Option, Variant } from "../types/table-data";
import { Item } from "../../order/types/item";
import { Assignment } from "../../order/types/assignment";

function createOption(option: Option) {
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
    return fetch(`/api/item/}`, {
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
    return fetch(`/api/variant`, {
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
    return fetch(`/api/assignment`, {
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