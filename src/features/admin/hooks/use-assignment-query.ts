import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Assignment } from "../../order/types/assignment";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getAssignment = introspect(
  "Get an assignment",
  ({
    queryKey: [_, assignmentId],
    signal,
  }: QueryFunctionContext): Promise<Assignment> =>
    axios
      .get(`/api/assignment/${assignmentId}`, { signal })
      .then((res) => res.data)
);

export function useAssignmentQuery(assignmentId: number) {
  return useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: getAssignment,
  });
}
