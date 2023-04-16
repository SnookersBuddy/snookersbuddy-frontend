import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Item } from "../types/item";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getItems = introspect(
  "Get all items",
  ({ signal }: QueryFunctionContext): Promise<Item[]> =>
    axios
      .get<Record<"items", Item[]>>("/api/items", { signal })
      .then((res) => res.data.items.sort((a, b) => a.id - b.id))
);

export const itemsQueryOptions = {
  queryKey: [],
  queryFn: getItems,
};

export function useItemsQuery() {
  return useQuery(itemsQueryOptions);
}
