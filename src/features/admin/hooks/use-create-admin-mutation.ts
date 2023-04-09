import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateItemInput, Option, Variant } from "../types/table-data";
import { Assignment } from "../../order/types/assignment";
import { introspect } from "../../../state/introspection";

const createOption = introspect("Create an option", (option: Option) =>
  fetch(`/api/option`, {
    method: "post",
    body: JSON.stringify(option),
    headers: {
      "content-type": "application/json",
    },
  })
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
  fetch(`/api/item`, {
    method: "post",
    body: JSON.stringify(item),
    headers: {
      "content-type": "application/json",
    },
  })
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
  fetch(`/api/variant`, {
    method: "post",
    body: JSON.stringify(variant),
    headers: {
      "content-type": "application/json",
    },
  })
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
    fetch(`/api/assignment`, {
      method: "post",
      body: JSON.stringify(assignment),
      headers: {
        "content-type": "application/json",
      },
    })
);

export function useCreateAssignmentMutation(
  options: UseMutationOptions<unknown, unknown, Assignment>
) {
  return useMutation({
    mutationFn: createAssignment,
    ...options,
  });
}
