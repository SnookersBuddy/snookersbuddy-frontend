import { useQuery } from "@tanstack/react-query";
import { Variant } from "../types/table-data";
import { idSort } from "../../../utils/id-sort";

async function getVariant(variantId: number): Promise<Variant> {
  const res = await fetch(`/api/variant/${variantId}`);
  const variant = (await res.json()) as Variant;
  return {
    ...variant,
    singleVariants: variant.singleVariants.sort(idSort),
  };
}

export function useVariantQuery(variantId: number) {
  return useQuery({
    queryKey: ["variant", variantId],
    queryFn: () => getVariant(variantId),
  });
}
