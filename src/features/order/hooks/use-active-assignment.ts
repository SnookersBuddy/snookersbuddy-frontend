import { useParams } from "react-router-dom";
import { invariant } from "../../../utils/invariant";
import { useAssignmentsQuery } from "./use-assignments-query";
import { Assignment } from "../types/assignment";

export function useActiveAssignment(): Assignment {
  const { assignmentId } = useParams();
  invariant(assignmentId, "assignmentId must be set in the params");

  const { data } = useAssignmentsQuery();
  const assignment = data!.find(
    (assignment) => assignment.id.toString() === assignmentId
  );
  invariant(assignment, `assignment for id ${assignmentId} not found`);
  return assignment;
}