import { Chip, Grid } from "@mui/material";
import { OrderedItem } from "../types";

type OrderedItemOptionsProps = {
  item: OrderedItem;
};

function OrderedItemOptions({ item }: OrderedItemOptionsProps) {
  return (
    <Grid gridArea="options" pl={1} container spacing={1}>
      {item.options.map((option) => (
        <Grid key={option.name} item xs="auto">
          <Chip
            sx={{ p: 0, color: "black", fontSize: "1.2rem" }}
            label={option.name}
            color={option.defaultValue ? "success" : "error"}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderedItemOptions;
