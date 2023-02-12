import { useQuery } from "@tanstack/react-query";
import { Configuration } from "../types/configuration";

function getConfiguration(itemId: string): Promise<Configuration> {
  return fetch(`/api/item/${itemId}/configuration`).then((res) => res.json());
}

export default function useConfigurationQuery(itemId: string) {
  return useQuery({
    queryKey: ["configurator", itemId],
    queryFn: () => getConfiguration(itemId),
  });
}
