import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import TabPanel from "./tab-panel";
import {Variant} from "../../order/types/configuration";

type VariantProps = {
    variants: Variant[];
    value: number;
};

function VariantTable({variants, value}: VariantProps)
{


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
                    <IconButton onClick={(e) => editVariant(e, params.row)}
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
                                onClick={(e) => deleteVariant(e, params.row)}
                                variant="contained">
                        <DeleteIcon/>
                    </IconButton>
                );
            }
        }
    ];

    function editVariant(e, row) {
        console.log("edit variant")
        console.log(row)
    }

    function deleteVariant(e, row) {
        console.log("delete variant")
        console.log(row)
    }

    return (
        <TabPanel value={value} index={1}>
            <Box sx={{height: 600}}>
                <DataGrid
                    rows={variants}
                    columns={columnsVariants}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                 autoHeight/>
                <Button>Neue Variante anlegen</Button>
            </Box>
        </TabPanel>)
}

export default VariantTable;
