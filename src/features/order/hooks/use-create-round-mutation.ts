import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Round } from "../types/round";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const createRound = introspect(
  "Create a round in current order",
  ({ assignmentId, orderedItems }: Round) => {
    const url = `/api/assignment/${assignmentId}/current-order/round`;
    return axios.post(url, orderedItems).then((res) => res.data);
  }
);

export function useCreateRoundMutation(
  options: UseMutationOptions<unknown, unknown, Round>
) {
  return useMutation({
    mutationFn: createRound,
    ...options,
  });
}
