import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTableQuery } from "../hooks/use-table-query";
import { BaseLayout } from "../../../components";
import { SyntheticEvent } from "react";
import ItemsTable from "./items-table";
import VariantTable from "./variant-table";
import OptionsTable from "./options-table";
import AssignmentTable from "./assignments-table";
import { useSearchParams } from "react-router-dom";

const OUTLET_PROPS = { maxWidth: "lg" } as const;

function Admin() {
  const { data } = useTableQuery();
  const { items, options, variants, assignments } = data!;

  const [search, setSearch] = useSearchParams();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setSearch({ view: newValue.toString() });
  };

  const tabQuery = search.get("view");
  const activeTabIdx = !!tabQuery ? +tabQuery : 0;

  return (
    <BaseLayout title="Items" outletProps={OUTLET_PROPS}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTabIdx}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Posten" {...a11yProps(0)} />
          <Tab label="Varianten" {...a11yProps(1)} />
          <Tab label="Optionen" {...a11yProps(2)} />
          <Tab label="Tische" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <ItemsTable items={items} value={activeTabIdx} />
      <VariantTable variants={variants} value={activeTabIdx} />
      <OptionsTable options={options} value={activeTabIdx} />
      <AssignmentTable assignments={assignments} value={activeTabIdx} />
    </BaseLayout>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Admin;
