import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TabPanel from "./tab-panel";
import React from "react";
import {Option} from "../types/table-data";
import {queryClient} from "../../../lib";
import {useDeleteOptionMutation} from "../hooks/use-delete-admin-mutation";

type ItemProps = {
    options: Option[];
    value: number;
    optionId: (optionId: number) => void;

};

function OptionsTable({options, value}: ItemProps) {

    const onTest: (optionId: number) => void;

    const columnsOptions: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'name',
            headerName: 'Name1',
            width: 150,
            editable: true,
        },
        {
            field: 'edit', headerName: 'Bearbeiten', width: 100, renderCell: (params) => {
                return (
                    <IconButton onClick={(e) => editOption(e, params.row)}
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
                                onClick={(e) => deleteOption(e, params.row)}
                                variant="contained">
                        <DeleteIcon/>
                    </IconButton>
                );
            }
        }
    ];

    function deleteOption(e, row) {
        console.log("delete Option")
        console.log(row)
        useDeleteOptionMutation(row.id)
    }

    const {id: number} = useDeleteOptionMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["key"]);
        },
    });


    return (
        <TabPanel value={value} index={2}>
            <Box sx={{height: 600}}>
                <DataGrid
                    rows={options}
                    columns={columnsOptions}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    autoHeight/>
            </Box>
            <Button>Neue Option anlegen</Button>
        </TabPanel>
    )

    function editOption(e, row) {
        console.log("edit Option")
        console.log(row)
    }


}

export default OptionsTable;