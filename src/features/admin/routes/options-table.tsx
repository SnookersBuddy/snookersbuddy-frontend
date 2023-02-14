import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TabPanel from "./tab-panel";
import React from "react";
import {Option} from "../types/table-data";

type ItemProps = {
    options: Option[];
    value: number;
};

function OptionsTable({options, value}: ItemProps) {

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
                />
            </Box>
            <Button>Neue Option anlegen</Button>
        </TabPanel>
    )

    function editOption(e, row) {
        console.log("edit Option")
        console.log(row)
    }

    function deleteOption(e, row) {
        console.log("delete Option")
        console.log(row)
    }
}

export default OptionsTable;