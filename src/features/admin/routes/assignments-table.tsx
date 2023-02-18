import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TabPanel from "./tab-panel";
import {Assignment} from "../../order/types/assignment";
import {useDeleteAssignmentMutation, useDeleteItemMutation} from "../hooks/use-delete-admin-mutation";
import {queryClient} from "../../../lib";

type AssignmentProps = {
    assignments: Assignment[];
    value: number;
};

function AssignmentTable({assignments, value}: AssignmentProps)
{
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
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'abbreviation',
            headerName: 'Abkürzung',
            width: 150,
            editable: true,
        },
        {
            field: 'assignmentName',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'edit', headerName: 'Bearbeiten', width: 100, renderCell: (params) => {
                return (
                    <IconButton onClick={(e) => editAssignment(e, params.row)}
                                variant="contained"
                                aria-label="delete" color="primary">
                        <EditIcon/>
                    </IconButton>
                );
            }
        },
        {
            field: 'delete', headerName: 'Löschen', width: 100, renderCell: (params) => {
                return (
                    <IconButton aria-label="delete" color="primary"
                                onClick={(e) => deleteAssignment(e, params.row)}
                                variant="contained">
                        <DeleteIcon/>
                    </IconButton>
                );
            }
        }
    ];
    return (<TabPanel value={value} index={3}>
        <Box sx={{height: 600}}>
            <DataGrid
                rows={assignments}
                columns={columnsAssignments}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
             autoHeight/>
        </Box>
        <Button>Neuen Tisch anlegen</Button>
    </TabPanel>)
}

function editAssignment(e, row) {
    console.log("edit assignment")
    console.log(row)
}

export default AssignmentTable;
