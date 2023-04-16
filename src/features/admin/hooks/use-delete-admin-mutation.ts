import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const deleteOption = introspect("Delete an option", (optionId: number) =>
  axios.delete(`/api/option/${optionId}`).then((res) => res.data)
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
  (assignmentId: number) => axios.delete(`/api/assignment/${assignmentId}`).then(res => res.data)
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
  axios.delete(`/api/item/${itemId}`).then(res => res.data),
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
  axios.delete(`/api/variant/${variantId}`).then(res => res.data)
);

export function useDeleteVariantMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: deleteVariant,
    ...options,
  });
}
