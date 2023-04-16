import { Option } from "../types/table-data";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getOption = introspect(
  "Get an option",
  ({
    queryKey: [_, optionId],
    signal,
  }: QueryFunctionContext): Promise<Option> =>
    axios.get(`/api/option/${optionId}`, { signal }).then((res) => res.data)
);

export function useOptionQuery(optionId: number) {
  return useQuery({
    queryKey: ["option", optionId],
    queryFn: getOption,
  });
}
