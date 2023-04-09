import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ItemData, Option, Variant } from "../types/table-data";
import { Assignment } from "../../order/types/assignment";
import { introspect } from "../../../state/introspection";

const updateOption = introspect("Update an option", (option: Option) => {
  const optionId = option.id;
  return fetch(`/api/option/${optionId}`, {
    method: "put",
    body: JSON.stringify(option),
    headers: {
      "content-type": "application/json",
    },
  });
});

export function useUpdateOptionMutation(
  options: UseMutationOptions<unknown, unknown, Option>
) {
  return useMutation({
    mutationFn: updateOption,
    ...options,
  });
}

const updateItem = introspect("Update an item", (item: ItemData) => {
  const itemId = item.itemId;
  return fetch(`/api/item/${itemId}`, {
    method: "put",
    body: JSON.stringify(item),
    headers: {
      "content-type": "application/json",
    },
  });
});

export function useUpdateItemMutation(
  options: UseMutationOptions<unknown, unknown, ItemData>
) {
  return useMutation({
    mutationFn: updateItem,
    ...options,
  });
}

const updateVariant = introspect("Update a variant", (variant: Variant) => {
  const variantId = variant.variantGroup.id;
  return fetch(`/api/variant/${variantId}`, {
    method: "put",
    body: JSON.stringify(variant),
    headers: {
      "content-type": "application/json",
    },
  });
});

export function useUpdateVariantMutation(
  options: UseMutationOptions<unknown, unknown, Variant>
) {
  return useMutation({
    mutationFn: updateVariant,
    ...options,
  });
}

const updateAssignment = introspect("Update an assignment", (assignment: Assignment) => {
  const assignmentId = assignment.id;
  return fetch(`/api/assignment/${assignmentId}`, {
    method: "put",
    body: JSON.stringify(assignment),
    headers: {
      "content-type": "application/json",
    },
  });
});

export function useUpdateAssignmentMutation(
  options: UseMutationOptions<unknown, unknown, Assignment>
) {
  return useMutation({
    mutationFn: updateAssignment,
    ...options,
  });
}
