import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {Round} from "../types/round";

function createRound({assignmentId, orderedItems}: Round) {
    const url = `/api/assignment/${assignmentId}/current-order/round`;

    return fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderedItems),
    });
}

export function useCreateRoundMutation(
    options: UseMutationOptions<unknown, unknown, Round>
) {
    return useMutation({
        mutationFn: createRound,
        ...options,
    });
}
