import { Button, Stack, Typography } from "@mui/material";
import { Item } from "../../types/item";
import { Link as RouterLink } from "react-router-dom";
import Fuse from "fuse.js";
import { useMemo } from "react";

const FUSE_OPTIONS: Partial<typeof Fuse.config> = {
  keys: [{ name: "itemName" }, { name: "abbreviation" }],
  threshold: 0.3,
};

type ItemsListProps = {
  searchTerm: string;
  items: Item[];
};

function ItemsList({ searchTerm, items }: ItemsListProps) {
  const fuse = useMemo(() => new Fuse(items, FUSE_OPTIONS), [items]);

  // If the search term is an empty string return the whole list otherwise filter.
  const targetList = searchTerm
    ? fuse.search(searchTerm).map(({ item }) => item as Item)
    : items;

  if (!targetList.length) {
    return <Typography textAlign="center">Kein Ergebnis gefunden.</Typography>
  }

  const itemElements = targetList.map((item) => (
    <Button
      variant="contained"
      key={item.id}
      component={RouterLink}
      to={item.id.toString()}
      sx={{ py: 1 }}
    >
      {item.itemName}
    </Button>
  ));

  return <Stack spacing={1}>{itemElements}</Stack>;
}

export default ItemsList;
