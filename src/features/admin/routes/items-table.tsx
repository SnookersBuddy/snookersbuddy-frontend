import {Box, Button, IconButton} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TabPanel from "./tab-panel";
import {useDeleteItemMutation} from "../hooks/use-delete-admin-mutation";
import {queryClient} from "../../../lib";

type ItemProps = {
    items;
    value: number;
};

function ItemsTable({items, value}: ItemProps) {

    const {mutate} = useDeleteItemMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        },
    });

    function deleteItem(e, row) {
        mutate(row.id)
    }

    const columnsItems: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'itemName',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'abbreviation',
            headerName: 'Abkürzung',
            width: 150,
            editable: true,
        },
        {
            field: 'edit', headerName: 'Bearbeiten', width: 100, renderCell: (params) => {
                return (
                    <IconButton onClick={(e) => editItem(e, params.row)}
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
                                onClick={(e) => deleteItem(e, params.row)}
                                variant="contained">
                        <DeleteIcon/>
                    </IconButton>
                );
            }
        }
    ];

    return (
        <TabPanel value={value} index={0}>
            <Box sx={{height: 600}}>
                <DataGrid
                    rows={items}
                    columns={columnsItems}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    autoHeight autoPageSize checkboxSelectionVisibleOnly/>
            </Box>
            <Button>Neues Item anlegen</Button>
        </TabPanel>
    )

    function editItem(e, row) {
        console.log("edit Item")
        console.log(row)
    }
}

export default ItemsTable;