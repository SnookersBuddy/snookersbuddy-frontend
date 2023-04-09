import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ItemData, Option, Variant } from "../types/table-data";
import { Assignment } from "../../order/types/assignment";

function updateOption(option: Option) {
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
  options: UseMutationOptions<unknown, unknown, Option>
) {
  return useMutation({
    mutationFn: updateOption,
    ...options,
  });
}

function updateItem(item: ItemData) {
  const itemId = item.itemId;
  return fetch(`/api/item/${itemId}`, {
    method: "put",
    body: JSON.stringify(item),
    headers: {
      "content-type": "application/json",
    },
  });
}

export function useUpdateItemMutation(
  options: UseMutationOptions<unknown, unknown, ItemData>
) {
  return useMutation({
    mutationFn: updateItem,
    ...options,
  });
}

function updateVariant(variant: Variant) {
  const variantId = variant.variantGroup.id;
  console.log("TEST")
  console.log(variant)
  return fetch(`/api/variant/${variantId}`, {
    method: "put",
    body: JSON.stringify(variant),
    headers: {
      "content-type": "application/json",
    },
  });
}

export function useUpdateVariantMutation(
  options: UseMutationOptions<unknown, unknown, Variant>
) {
  return useMutation({
    mutationFn: updateVariant,
    ...options,
  });
}

function updateAssignment(assignment: Assignment) {
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
  options: UseMutationOptions<unknown, unknown, Assignment>
) {
  return useMutation({
    mutationFn: updateAssignment,
    ...options,
  });
}
