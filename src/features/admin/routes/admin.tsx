import {Box, Button, IconButton, Typography} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getTableData} from "../hooks/use-table-query";
import {BaseLayout} from "../../../components";
import React from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Admin() {

    const adminQuery = getTableData();
    const items = adminQuery.data!.items;
    const options = adminQuery.data!.options;
    const variants = adminQuery.data!.variants;
    const assignments = adminQuery.data!.assignments;

    const [value, setValue] = React.useState(0);

    const columnsOptions: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: 'Name',
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

    const columnsItems: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <BaseLayout title="Items" sx={{width: '200%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Items" {...a11yProps(0)}/>
                    <Tab label="Varianten" {...a11yProps(1)}/>
                    <Tab label="Optionen" {...a11yProps(2)}/>
                    <Tab label="Assignments" {...a11yProps(3)}/>
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Box sx={{height: 600, width: '130%'}}>
                    <DataGrid
                        rows={items}
                        columns={columnsItems}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{newEditingApi: true}}
                        autoHeight/>
                </Box>
                <Button>Neues Item anlegen</Button>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Box sx={{height: 600, width: '130%'}}>
                    <DataGrid
                        rows={variants}
                        columns={columnsVariants}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{newEditingApi: true}}
                    />
                    <Button>Neue Variante anlegen</Button>
                </Box>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Box sx={{height: 600, width: '130%'}}>
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

            <TabPanel value={value} index={3}>
                <Box sx={{height: 600, width: '130%'}}>
                    <DataGrid
                        rows={assignments}
                        columns={columnsAssignments}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{newEditingApi: true}}
                    />
                </Box>
                <Button>Neuen Tisch anlegen</Button>
            </TabPanel>

        </BaseLayout>
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function editAssignment(e, row) {
    console.log("edit assignment")
    console.log(row)
}

function deleteAssignment(e, row) {
    console.log("delete assignment")
    console.log(row)
}

function editVariant(e, row) {
    console.log("edit variant")
    console.log(row)
}

function deleteVariant(e, row) {
    console.log("delete variant")
    console.log(row)
}

function editItem(e, row) {
    console.log("edit Item")
    console.log(row)
}

function deleteItem(e, row) {
    console.log("delete Item")
    console.log(row)
}

function editOption(e, row) {
    console.log("edit Option")
    console.log(row)
}

function deleteOption(e, row) {
    console.log("delete Option")
    console.log(row)
}

export default Admin;