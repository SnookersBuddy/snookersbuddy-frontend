import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { theme } from "../../../../lib";
import { Configuration } from "../../types/configuration";
import { useState, MouseEvent } from "react";

type ConfigEntryProps = {
  config: Configuration;
  onAmountChange: (newAmount: number) => void;
};

function ConfigEntry({ config, onAmountChange }: ConfigEntryProps) {
  const [isEditing, setIsEditing] = useState(false);

  const incrementAmount = (e: MouseEvent) => {
    e.stopPropagation();
    onAmountChange(config.amount + 1);
  };

  const decrementAmount = (e: MouseEvent) => {
    e.stopPropagation();
    if (config.amount > 0) {
      onAmountChange(config.amount - 1);
    }
  };

  const sizeVariant = config.variants.find(
    // TODO: evil hack
    (variant) => variant.name === "Groesse" || variant.name === "Größe"
  );
  const size = sizeVariant?.variants.find(
    (variant) => variant.id === sizeVariant.defaultVariantId
  )?.name;

  const remainingVariants = config.variants
    .filter((variant) => variant !== sizeVariant)
    .map((variant) => (
      <Box key={variant.name}>
        {
          variant.variants.find(
            (single) => single.id === variant.defaultVariantId
          )!.name
        }
      </Box>
    ));

  const options = config.options.map((option) => (
    <Grid key={option.name} item xs="auto">
      <Chip
        sx={{ p: 0, color: "black" }}
        label={option.name}
        color={option.defaultValue ? "success" : "error"}
      />
    </Grid>
  ));

  return (
    <Stack
      sx={{
        p: 1,
        bgcolor: theme.extraPalette.cardBg,
        borderRadius: "5px",
      }}
      spacing={2}
      onClick={() => setIsEditing(!isEditing)}
    >
      <Stack direction="row" spacing={2}>
        <Box>
          <Typography fontSize={22}>{config.amount}x</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Stack width="100%" spacing={0.25}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize={22}>{config.item.itemName}</Typography>
            {size && <Typography fontSize={22}>{size}</Typography>}
          </Box>
          <Grid container>
            <Grid item xs>
              {remainingVariants}
            </Grid>
            <Grid item xs>
              <Grid container spacing={1} direction="row-reverse">
                {options}
              </Grid>
            </Grid>
          </Grid>
          {config.comment && (
            <Typography fontStyle="italic">{config.comment}</Typography>
          )}
        </Stack>
      </Stack>
      {isEditing && (
        <>
          <Divider />
          <Stack direction="row" spacing={1}>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={decrementAmount}
            >
              -
            </Button>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={incrementAmount}
            >
              +
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default ConfigEntry;
