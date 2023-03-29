import { Option } from "../types/table-data";
import { useQuery } from "@tanstack/react-query";

function getOption(optionId: number): Promise<Option> {
  return fetch(`/api/option/${optionId}`).then((res) => res.json());
}

export function useOptionQuery(optionId: number) {
  return useQuery({
    queryKey: ["option", optionId],
    queryFn: () => getOption(optionId),
  });
}
