import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TabPanel from "./tab-panel";
import { Assignment } from "../../order/types/assignment";
import { useDeleteAssignmentMutation } from "../hooks/use-delete-admin-mutation";
import { queryClient } from "../../../lib";
import { Link as RouterLink } from "react-router-dom";

type AssignmentProps = {
  assignments: Assignment[];
  value: number;
};

function AssignmentTable({assignments, value}: AssignmentProps) {
    const {mutate} = useDeleteAssignmentMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        },
    });

    function deleteAssignment(e, row) {
        mutate(row.id)
    }

    const columnsAssignments: GridColDef[] = [
      {
        field: "id",
        headerName: "ID",
        width: 90,
      },
      {
        field: "abbreviation",
        headerName: "Abkürzung",
        width: 150,
        editable: true,
      },
      {
        field: "displayName",
        headerName: "Name",
        width: 150,
        editable: true,
      },
      {
        field: "edit",
        headerName: "Bearbeiten",
        width: 100,
        renderCell: (params) => {
          return (
            <IconButton
              variant="contained"
              aria-label="delete"
              color="primary"
              key={params.row.id}
              component={RouterLink}
              to={`assignment/${params.row.id}`}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
      {
        field: "delete",
        headerName: "Löschen",
        width: 100,
        renderCell: (params) => {
          return (
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={(e) => deleteAssignment(e, params.row)}
              variant="outlined"
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      },
    ];
    return (
        <TabPanel value={value} index={3}>
            <Box sx={{height: 600}}>
                <DataGrid
                    rows={assignments}
                    columns={columnsAssignments}
                    pageSize={15}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    autoHeight/>
                <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`assignment/new`}>
                        Neuen Tisch anlegen
                    </Button>
                </Box>
            </Box>

        </TabPanel>)
}

export default AssignmentTable;
