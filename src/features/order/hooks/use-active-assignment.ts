import { invariant } from "../../../utils/invariant";
import { useAssignmentsQuery } from "./use-assignments-query";
import { Assignment } from "../types/assignment";
import { useStrongParams } from "../../../hooks/use-strong-params";

export function useActiveAssignment(): Assignment {
  const { assignmentId } = useStrongParams("assignmentId");

  const { data } = useAssignmentsQuery();
  const assignment = data!.find(
    (assignment) => assignment.id.toString() === assignmentId
  );
  invariant(assignment, `assignment for id ${assignmentId} not found`);
  return assignment;
}
