import { useQuery } from "@tanstack/react-query";
import { Item } from "../types/item";
import { introspect } from "../../../state/introspection";

const getItems = introspect(
  "Get all items",
  (): Promise<Item[]> =>
    fetch("/api/items")
      .then((res) => res.json())
      .then((res: Record<"items", Item[]>) =>
        res.items.sort((a, b) => a.id - b.id)
      )
);

export const itemsQueryOptions = {
  queryKey: [],
  queryFn: getItems,
};

export function useItemsQuery() {
  return useQuery(itemsQueryOptions);
}
