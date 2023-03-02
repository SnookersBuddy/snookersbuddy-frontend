import {Variant} from "../../order/types/configuration";
import {useQuery} from "@tanstack/react-query";


function getVariant(variantId: number): Promise<Variant> {
    return fetch(`/api/variant/${variantId}`)
        .then((res) => res.json())
}

export function getVariantData(variantId){
    return useQuery({
        queryKey: ["variant", variantId],
        queryFn: () => getVariant(variantId),
    });
}