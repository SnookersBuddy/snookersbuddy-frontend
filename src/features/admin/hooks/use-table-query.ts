import { useQuery } from "@tanstack/react-query";
import { TableData } from "../types/table-data";
import { introspect } from "../../../state/introspection";

const getTables = introspect(
  "Get admin table data",
  (): Promise<TableData> => fetch("/api/table-data").then((res) => res.json())
);

export const tableDataQueryOptions = {
  queryKey: ["table-data"],
  queryFn: getTables,
};

export function useTableQuery() {
  return useQuery(tableDataQueryOptions);
}
