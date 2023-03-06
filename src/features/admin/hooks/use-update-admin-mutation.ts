import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Option, Variant } from "../types/table-data";
import { Item } from "../../order/types/item";
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

function updateItem(item: Item) {
  const itemId = item.id;
  return fetch(`/api/item/${itemId}`, {
    method: "put",
    body: JSON.stringify(item),
    headers: {
      "content-type": "application/jsn",
    },
  });
}

export function useUpdateItemMutation(
  options: UseMutationOptions<unknown, unknown, Item>
) {
  return useMutation({
    mutationFn: updateItem,
    ...option,
  });
}

function updateVariant(variant: Variant) {
  const variantId = variant.variantGroup.id;
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
    ...optios,
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
    ...optios,
  });
}
