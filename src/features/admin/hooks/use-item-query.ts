import {useQuery} from "@tanstack/react-query";
import {Item} from "../../order/types/item";

function getItem(itemId: number): Promise<Item> {
    return fetch(`/api/item-creation-data`)
        .then((res) => res.json())

}

export function getItemData(itemId) {
    return useQuery({
        queryKey: ["item", itemId],
        queryFn: () => getItem(itemId),
    });
}