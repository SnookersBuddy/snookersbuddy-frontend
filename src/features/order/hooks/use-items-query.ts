import { useQuery } from "@tanstack/react-query";
import { Item } from "../types/item";

function getItems(): Promise<Item[]> {
  return fetch("/api/items")
    .then((res) => res.json())
    .then((res: Record<"items", Item[]>) =>
      res.items.sort((a, b) => a.id - b.id)
    );
}

export const itemsQueryOptions = {
    queryKey: [],
    queryFn: getItems
  }

export function useItemsQuery() {
  return useQuery(itemsQueryOptions);
}