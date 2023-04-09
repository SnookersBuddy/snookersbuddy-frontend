import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { introspect } from "../../../state/introspection";

const updateMarkRoundAsPrepared = introspect(
  "Mark round as prepared",
  (roundId: number) =>
    fetch(`/api/round/${roundId}/state`, {
      method: "put",
      body: JSON.stringify({ state: "PREPARED" }),
      headers: {
        "content-type": "application/json",
      },
    })
);

export function usePrepareRoundMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: updateMarkRoundAsPrepared,
    ...options,
  });
}
