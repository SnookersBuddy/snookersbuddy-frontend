import { Option } from "../types/table-data";
import { useQuery } from "@tanstack/react-query";
import { introspect } from "../../../state/introspection";

const getOption = introspect(
  "Get an option",
  (optionId: number): Promise<Option> =>
    fetch(`/api/option/${optionId}`).then((res) => res.json())
);

export function useOptionQuery(optionId: number) {
  return useQuery({
    queryKey: ["option", optionId],
    queryFn: () => getOption(optionId),
  });
}
