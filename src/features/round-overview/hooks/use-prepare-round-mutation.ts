import { useMutation, UseMutationOptions } from "@tanstack/react-query";

function updateMarkRoundAsPrepared(roundId: number) {
  return fetch(`/api/round/${roundId}/state`, {
    method: "put",
    body: JSON.stringify({ state: "PREPARED" }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export function usePrepareRoundMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: updateMarkRoundAsPrepared,
    ...options,
  });
}
