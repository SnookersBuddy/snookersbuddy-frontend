import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { introspect } from "../../../state/introspection";

const deleteOption = introspect("Delete an option", (optionId: number) =>
  fetch(`/api/option/${optionId}`, {
    method: "delete",
    headers: {},
  })
);

export function useDeleteOptionMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: deleteOption,
    ...options,
  });
}

const deleteAssignment = introspect(
  "Delete an assignment",
  (assignmentId: number) =>
    fetch(`/api/assignment/${assignmentId}`, {
      method: "delete",
      headers: {},
    })
);

export function useDeleteAssignmentMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: deleteAssignment,
    ...options,
  });
}

const deleteItem = introspect("Delete item", (itemId: number) =>
  fetch(`/api/item/${itemId}`, {
    method: "delete",
    headers: {},
  })
);

export function useDeleteItemMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: deleteItem,
    ...options,
  });
}

const deleteVariant = introspect("Delete a variant", (variantId: number) =>
  fetch(`/api/variant/${variantId}`, {
    method: "delete",
    headers: {},
  })
);

export function useDeleteVariantMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: deleteVariant,
    ...options,
  });
}
