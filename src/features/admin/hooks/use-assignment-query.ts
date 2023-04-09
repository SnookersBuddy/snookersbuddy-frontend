import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../../order/types/assignment";
import { introspect } from "../../../state/introspection";

const getAssignment = introspect(
  "Get an assignment",
  (assignmentId: number): Promise<Assignment> =>
    fetch(`/api/assignment/${assignmentId}`).then((res) => res.json())
);

export function useAssignmentQuery(assignmentId: number) {
  return useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: () => getAssignment(assignmentId),
  });
}
