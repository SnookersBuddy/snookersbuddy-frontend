import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { theme } from "../../../../lib";
import { Configuration } from "../../types/configuration";
import { useState } from "react";
import AmountEditor from "./amount-editor";
import ConfigEntryOptions from "./config-entry-options";

type ConfigEntryProps = {
  config: Configuration;
  onAmountChange: (newAmount: number) => void;
};

function ConfigEntry({ config, onAmountChange }: ConfigEntryProps) {
  const [isEditing, setIsEditing] = useState(false);

  const incrementAmount = () => {
    onAmountChange(config.amount + 1);
  };

  const decrementAmount = () => {
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
              <ConfigEntryOptions options={config.options} />
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
          <AmountEditor
            onDecrement={decrementAmount}
            onIncrement={incrementAmount}
          />
        </>
      )}
    </Stack>
  );
}

export default ConfigEntry;
