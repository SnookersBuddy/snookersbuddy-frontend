import {Box, Button, IconButton} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TabPanel from "./tab-panel";
import {useDeleteItemMutation} from "../hooks/use-delete-admin-mutation";
import {queryClient} from "../../../lib";
import {Link as RouterLink} from "react-router-dom";
import {Item} from "../../order/types/item";


type ItemProps = {
    items: Item[];
    value: number;
};

function ItemsTable({items, value}: ItemProps) {

    const {mutate} = useDeleteItemMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        },
    });

    function deleteItem(e, row) {  {/*TODO - unused event*/}
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
                    <IconButton
                        variant="contained"
                        aria-label="delete"
                        color="primary"
                        key={params.row.id}
                        component={RouterLink}
                        to={`item/${params.row.id}`}>
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
                    pageSize={15}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    autoHeight autoPageSize checkboxSelectionVisibleOnly/>
                <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`item/new`}>
                        Neues Item anlegen</Button>
                </Box>
            </Box>

        </TabPanel>
    )
}

export default ItemsTable;