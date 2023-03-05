import { FixedContentLayout } from "../../../../components";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import ItemsList from "./items-list";
import { Link } from "react-router-dom";
import { useItemsQuery } from "../../hooks/use-items-query";
import { useActiveAssignment } from "../../hooks/use-active-assignment";

function Items() {
  const itemsQuery = useItemsQuery();
  const assignment = useActiveAssignment();

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <FixedContentLayout
      title={`${assignment.displayName} - Getränke`}
      header={
        <TextField
          id="items-search"
          placeholder="Suche nach einem Getränk..."
          variant="outlined"
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ width: "100%" }}
        />
      }
      content={<ItemsList searchTerm={searchTerm} items={itemsQuery.data!} />}
      footer={
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" component={Link} to="../overview">
            Übersicht
          </Button>
        </Box>
      }
    ></FixedContentLayout>
  );
}

export default Items;
