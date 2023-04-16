import { introspect } from "../state/introspection";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { AppConfig } from "../types/app-config";
import axios from "axios";

const getAppConfig = introspect(
  "Get the app config",
  ({ signal }: QueryFunctionContext): Promise<AppConfig> =>
    axios.get(`/api/appconfig`, { signal }).then((res) => res.data)
);

export function useAppConfigQuery() {
  return useQuery({
    queryKey: ["appconfig"],
    queryFn: getAppConfig,
  });
}
