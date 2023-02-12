import {useQuery} from "@tanstack/react-query";
import {TableData} from "../types/table-data";

function getTables(): Promise<TableData>{
    return fetch("/api/table-data")
        .then((res) => res.json())
}

export const tableDataQueryOptions = {
    queryKey: ["table-data"],
    queryFn: getTables,
};

export function getTableData() {
    return useQuery(tableDataQueryOptions);
}
