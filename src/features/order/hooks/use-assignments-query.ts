import { useQuery } from "@tanstack/react-query";
import { Assignment } from "../types/assignment";

function getAssignments(): Promise<Assignment[]> {
  return fetch("/api/assignments")
    .then((res) => res.json())
    .then((res: Record<"assignments", Assignment[]>) =>
      res.assignments.sort((a, b) => a.id - b.id)
    );
}

export const assignmentsQueryOptions = {
  queryKey: ["assignments"],
  queryFn: getAssignments,
};

export function useAssignmentsQuery() {
  console.log("HÄ?")

  return useQuery(assignmentsQueryOptions);
}
