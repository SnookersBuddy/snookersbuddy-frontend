import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ItemData, Option, Variant } from "../types/table-data";
import { Assignment } from "../../order/types/assignment";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const updateOption = introspect("Update an option", (option: Option) =>
  axios.put(`/api/option/${option.id}`, option).then(res => res.data)
);

export function useUpdateOptionMutation(
  options: UseMutationOptions<unknown, unknown, Option>
) {
  return useMutation({
    mutationFn: updateOption,
    ...options,
  });
}

const updateItem = introspect("Update an item", (item: ItemData) =>
  axios.put(`/api/item/${item.itemId}`, item).then(res => res.data)
);

export function useUpdateItemMutation(
  options: UseMutationOptions<unknown, unknown, ItemData>
) {
  return useMutation({
    mutationFn: updateItem,
    ...options,
  });
}

const updateVariant = introspect("Update a variant", (variant: Variant) =>
  axios.put(`/api/variant/${variant.variantGroup.id}`, variant).then(res => res.data)
);

export function useUpdateVariantMutation(
  options: UseMutationOptions<unknown, unknown, Variant>
) {
  return useMutation({
    mutationFn: updateVariant,
    ...options,
  });
}

const updateAssignment = introspect(
  "Update an assignment",
  (assignment: Assignment) =>
    axios.put(`/api/assignment/${assignment.id}`, assignment).then(res => res.data)
);

export function useUpdateAssignmentMutation(
  options: UseMutationOptions<unknown, unknown, Assignment>
) {
  return useMutation({
    mutationFn: updateAssignment,
    ...options,
  });
}
