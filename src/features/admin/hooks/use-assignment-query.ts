import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../../order/types/assignment";

function getAssignment(assignmentId: number): Promise<Assignment> {
  return fetch(`/api/assignment/${assignmentId}`).then((res) => res.json());
}

export function useAssignmentQuery(assignmentId) {
  return useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: () => getAssignment(assignmentId),
  });
}