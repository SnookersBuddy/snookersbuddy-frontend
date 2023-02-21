import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TabPanel from "./tab-panel";
import {Variant} from "../../order/types/configuration";
import {useDeleteVariantMutation} from "../hooks/use-delete-admin-mutation";
import {queryClient} from "../../../lib";
import {Link as RouterLink} from "react-router-dom";


type VariantProps = {
    variants: Variant[];
    value: number;
};

function VariantTable({variants, value}: VariantProps) {

    const {mutate} = useDeleteVariantMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(["table-data"]);
        },
    });

    function deleteVariant(e, row) {
        mutate(row.id)
    }

    const columnsVariants: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'name',
            headerName: 'Name',
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
                        to={`variant/${params.row.id}`}>
                        <EditIcon/>
                    </IconButton>
                );
            }
        },
        {
            field: 'delete', headerName: 'Löschen', width: 100, renderCell: (params) => {
                return (
                    <IconButton aria-label="delete" color="primary"
                                onClick={(e) => deleteVariant(e, params.row)}
                                variant="contained">
                        <DeleteIcon/>
                    </IconButton>
                );
            }
        }
    ];

    return (
        <TabPanel value={value} index={1}>
            <Box sx={{height: 600}}>
                <DataGrid
                    rows={variants}
                    columns={columnsVariants}
                    pageSize={15}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                    autoHeight/>
                <Box sx={{display: "flex", justifyContent: "center", mt:2}}>
                    <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`variant/new`}>
                        Neue Variante anlegen</Button>
                </Box>
            </Box>
        </TabPanel>)
}

export default VariantTable;
