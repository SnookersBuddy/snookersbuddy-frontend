import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions
} from "@tanstack/react-query";
import { Assignment } from "../types/assignment";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getAssignments = introspect(
  "List all assignments",
  ({ signal }: QueryFunctionContext): Promise<Assignment[]> =>
    axios
      .get<{ assignments: Assignment[] }>("/api/assignments", { signal })
      .then((res) => res.data.assignments.sort((a, b) => a.id - b.id))
);

export const assignmentsQueryOptions = {
  queryKey: ["assignments"],
  queryFn: getAssignments,
};

export function useAssignmentsQuery(
  options: Omit<UseQueryOptions<Assignment[], unknown, Assignment[], string[]>, 'queryFn' | 'queryKey'> = {}
) {
  return useQuery({
    ...assignmentsQueryOptions,
    ...options,
  });
}
