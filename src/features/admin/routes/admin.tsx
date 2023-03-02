import {Box} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {getTableData} from "../hooks/use-table-query";
import {BaseLayout} from "../../../components";
import React from "react";
import ItemsTable from "./items-table";
import VariantTable from "./variant-table";
import OptionsTable from "./options-table";
import AssignmentTable from "./assignments-table";

function Admin() {
    const adminQuery = getTableData(); //TODO -> useTableQuery -> Naming
    const items = adminQuery.data!.items;
    const options = adminQuery.data!.options;
    const variants = adminQuery.data!.variants;
    const assignments = adminQuery.data!.assignments;

    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <BaseLayout title="Items" maxWidth={'lg'}> {/*TODO - property*/}

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Items" {...a11yProps(0)}/>
                    <Tab label="Varianten" {...a11yProps(1)}/>
                    <Tab label="Optionen" {...a11yProps(2)}/>
                    <Tab label="Assignments" {...a11yProps(3)}/>
                </Tabs>
            </Box>
            <ItemsTable items={items} value={value}/>
            <VariantTable variants={variants} value={value}/>
            <OptionsTable options={options} value={value}/>
            <AssignmentTable assignments={assignments} value={value}/>

        </BaseLayout>
    );
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default Admin;