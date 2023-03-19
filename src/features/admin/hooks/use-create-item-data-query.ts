import {useQuery} from "@tanstack/react-query";
import {ItemData} from "../types/table-data";

function getItem(itemId: number): Promise<ItemData> {
    if(itemId != 0) {
        console.log("item id =" + itemId )
        return (
            fetch(`/api/item-creation-data/${itemId}`)
                .then((res) => res.json())
        );
    }
    else{
        console.log("item id test" )
        return (
            fetch(`/api/item-creation-data`)
                .then((res) => res.json())
        );
    }
}

export function useCreateItemDataQuery(itemId: number) {
    return useQuery({
        queryKey: ["item", itemId],
        queryFn: () => getItem(itemId),
    });
}
