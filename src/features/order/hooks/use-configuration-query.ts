import { useQuery } from "@tanstack/react-query";
import { Configuration } from "../types/configuration";
import { introspect } from "../../../state/introspection";

const getConfiguration = introspect(
  "Get an item config",
  (itemId: string): Promise<Configuration> =>
    fetch(`/api/item/${itemId}/configuration`).then((res) => res.json())
);

export default function useConfigurationQuery(itemId: string) {
  return useQuery({
    queryKey: ["configurator", itemId],
    queryFn: () => getConfiguration(itemId),
  });
}
