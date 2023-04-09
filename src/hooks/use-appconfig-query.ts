import { introspect } from "../state/introspection";
import { useQuery } from "@tanstack/react-query";
import { AppConfig } from "../types/app-config";

const getAppConfig = introspect(
  "Get an assignment",
  (): Promise<AppConfig> => fetch(`/api/appconfig`).then((res) => res.json())
);

export function useAppConfigQuery() {
  return useQuery({
    queryKey: ["appconfig"],
    queryFn: () => getAppConfig(),
  });
}
