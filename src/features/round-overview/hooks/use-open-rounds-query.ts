import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { SortedRound, UnpreparedRound } from "../types";

function fetchOpenRounds({
  signal,
}: QueryFunctionContext): Promise<SortedRound[]> {
  return fetch("/api/round?status=unprepared", {
    signal,
  })
    .then((res) => res.json())
    .then((res: UnpreparedRound[]) =>
      res
        .map((value) => ({
          id: value.id,
          orderedAt: value.orderedAt,
          orderedBy: value.orderedBy,
          orderedItemsByCategory: value.orderedItems.reduce(
            (previousValue, currentValue) => {
              previousValue[currentValue.category.name] = (
                previousValue[currentValue.category.name] || []
              ).concat(currentValue);
              return previousValue;
            },
            {} as SortedRound["orderedItemsByCategory"]
          ),
        }))
        .sort(
          (a, b) =>
            new Date(a.orderedAt).getTime() - new Date(b.orderedAt).getTime()
        )
    );
}

export function useOpenRoundsQuery(options: UseQueryOptions<SortedRound[]>) {
  return useQuery({
    queryKey: ["round-overview"],
    queryFn: fetchOpenRounds,
    ...options,
  });
}
