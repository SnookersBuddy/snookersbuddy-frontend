import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { TableData } from "../types/table-data";
import { introspect } from "../../../state/introspection";
import axios from "axios";

const getTables = introspect(
  "Get admin table data",
  ({ signal }: QueryFunctionContext): Promise<TableData> =>
    axios.get("/api/table-data", { signal }).then((res) => res.data)
);

export const tableDataQueryOptions = {
  queryKey: ["table-data"],
  queryFn: getTables,
};

export function useTableQuery() {
  return useQuery(tableDataQueryOptions);
}
