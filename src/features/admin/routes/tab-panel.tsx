import {Box, Typography} from "@mui/material";
import React from "react";

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

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
                    {children}
                </Box>
            )}
        </div>
    );
}
export default TabPanel;