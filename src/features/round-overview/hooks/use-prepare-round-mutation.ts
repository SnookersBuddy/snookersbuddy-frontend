import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const updateMarkRoundAsPrepared = introspect(
  "Mark round as prepared",
  (roundId: number) =>
    axios
      .put(`/api/round/${roundId}/state`, { state: "PREPARED" })
      .then((res) => res.data)
);

export function usePrepareRoundMutation(
  options: UseMutationOptions<unknown, unknown, number>
) {
  return useMutation({
    mutationFn: updateMarkRoundAsPrepared,
    ...options,
  });
}
