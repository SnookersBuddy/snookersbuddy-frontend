import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Configuration } from "../types/configuration";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getConfiguration = introspect(
  "Get an item config",
  ({ queryKey: [_, itemId], signal }: QueryFunctionContext): Promise<Configuration> =>
    axios
      .get(`/api/item/${itemId}/configuration`, { signal })
      .then((res) => res.data)
);

export default function useConfigurationQuery(itemId: string) {
  return useQuery({
    queryKey: ["configurator", itemId],
    queryFn: getConfiguration,
  });
}
