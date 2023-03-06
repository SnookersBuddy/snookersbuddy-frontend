import { useQuery } from "@tanstack/react-query";
import { Item } from "../../order/types/item";

function getItem(itemId: number): Promise<Item> {
  return fetch(`/api/item-creation-data`).then((res) => res.json());
}

export function useItemQuery(itemId: number) {
  return useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId),
  });
}
