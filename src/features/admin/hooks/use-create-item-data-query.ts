import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { ItemData } from "../types/table-data";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getItem = introspect(
  "Get item creation data",
  ({
    queryKey: [_, itemId],
    signal,
  }: QueryFunctionContext): Promise<ItemData> => {
    const url =
      itemId != 0
        ? `/api/item-creation-data/${itemId}`
        : "/api/item-creation-data";
    return axios.get(url, { signal }).then((res) => res.data);
  }
);

export function useCreateItemDataQuery(itemId: number) {
  return useQuery({
    queryKey: ["item", itemId],
    queryFn: getItem,
    refetchOnMount: "always",
  });
}
