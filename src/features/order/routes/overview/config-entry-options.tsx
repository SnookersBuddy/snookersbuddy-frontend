import { Chip, Grid } from "@mui/material";
import { Option } from "../../types/configuration";

type ConfigEntryOptionsProps = {
  options: Option[];
};

function ConfigEntryOptions({ options }: ConfigEntryOptionsProps) {
  return (
    <Grid container spacing={1} direction="row-reverse">
      {options.map((option) => (
        <Grid key={option.name} item xs="auto">
          <Chip
            sx={{ p: 0, color: "black" }}
            label={option.name}
            color={option.defaultValue ? "success" : "error"}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ConfigEntryOptions;
