import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Variant } from "../types/table-data";
import { idSort } from "../../../utils/id-sort";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getVariant = introspect(
  "Get a variant",
  async ({
    queryKey: [_, variantId],
    signal,
  }: QueryFunctionContext): Promise<Variant> => {
    const res = await axios.get<Variant>(`/api/variant/${variantId}`, {
      signal,
    });
    return {
      ...res.data,
      singleVariants: res.data.singleVariants.sort(idSort),
    };
  }
);

export function useVariantQuery(variantId: number) {
  return useQuery({
    queryKey: ["variant", variantId],
    queryFn: getVariant,
  });
}
