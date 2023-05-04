import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateItemInput, Option, Variant } from "../types/table-data";
import { Assignment } from "../../order/types/assignment";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const createOption = introspect("Create an option", (option: Option) =>
  axios.post(`/api/option`, option).then((res) => res.data)
);

export function useCreateOptionMutation(
  options: UseMutationOptions<unknown, unknown, Option>
) {
  return useMutation({
    mutationFn: createOption,
    ...options,
  });
}

const createItem = introspect("Create an item", (item: CreateItemInput) =>
  axios.post(`/api/item`, item).then((res) => res.data)
);

export function useCreateItemMutation(
  options: UseMutationOptions<unknown, unknown, CreateItemInput>
) {
  return useMutation({
    mutationFn: createItem,
    ...options,
  });
}

const createVariant = introspect("Create a variant", (variant: Variant) =>
  axios.post(`/api/variant`, variant).then((res) => res.data)
);

export function useCreateVariantMutation(
  options: UseMutationOptions<unknown, unknown, Variant>
) {
  return useMutation({
    mutationFn: createVariant,
    ...options,
  });
}

const createAssignment = introspect(
  "Create an assignment",
  (assignment: Assignment) =>
    axios.post(`/api/assignment`, assignment).then((res) => res.data)
);

export function useCreateAssignmentMutation(
  options: UseMutationOptions<unknown, unknown, Assignment>
) {
  return useMutation({
    mutationFn: createAssignment,
    ...options,
  });
}
