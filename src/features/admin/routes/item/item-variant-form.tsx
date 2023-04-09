import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { ItemData } from "../../types/table-data";
import { TransformController } from "../../../../components/transform-controller";
import { ChangeEvent, useEffect } from "react";

type ItemVariantFormProps = {
  variant: FieldArrayWithId<ItemData, "availableVariants", "variantControlId">;
  index: number;
};

function ItemVariantForm({ variant, index }: ItemVariantFormProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ItemData>();

  const variantName =
    `availableVariants.${index}` as `availableVariants.${number}`;
  const { fields } = useFieldArray({
    control,
    name: `${variantName}.variants`,
    keyName: "singleVariantControlId",
  });

  const selectedSingleVariants = watch(`${variantName}.variants`).filter(
    ({ selected }) => selected
  );
  const selectedSingleVariantsElements = selectedSingleVariants.map(
    (singleVariant) => (
      <MenuItem key={singleVariant.id} value={singleVariant.id}>
        {singleVariant.name}
      </MenuItem>
    )
  );

  const isNoSingleVariantSelected = !selectedSingleVariants.length;
  useEffect(() => {
    if (isNoSingleVariantSelected) {
      setValue(`${variantName}.defaultVariantId`, 0);
    }
  }, [isNoSingleVariantSelected]);

  return (
    <Stack spacing={2}>
      <Box display="flex" alignItems="baseline" justifyContent="space-between">
        <Typography variant="h5">{variant.name}</Typography>
        <FormControl
          sx={{ minWidth: 200 }}
          error={errors.availableVariants?.[index]}
        >
          <InputLabel id={`variant-${variant.variantControlId}-default-label`}>
            Standard auswählen
          </InputLabel>
          {/*TODO extract this transform object to a constant*/}
          <TransformController
            name={`${variantName}.defaultVariantId`}
            control={control}
            transform={{
              toInput: (value: number) =>
                // If the current default variant id is no longer selected, then set the select value to ''.
                !selectedSingleVariants.find(({ id }) => id === value) ||
                value === 0
                  ? ""
                  : value,
              toOutput: (event: unknown) => {
                const inputEvent = event as ChangeEvent<HTMLSelectElement>;
                const output = Number.parseInt(inputEvent.target.value);
                return isNaN(output) ? 0 : output;
              },
            }}
            rules={{
              validate: {
                selected: (v) =>
                  v != 0 || selectedSingleVariantsElements.length == 0,
              },
            }}
            render={({ field }) => (
              <Select
                {...field}
                disabled={!selectedSingleVariants.length}
                autoWidth
                labelId={`variant-${variant.variantControlId}-default-label`}
                label="Standard auswählen"
              >
                {selectedSingleVariantsElements}
              </Select>
            )}
          />
        </FormControl>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(3, minmax(0, 1fr))">
        {fields.map((singleVariant, singleVariantIndex) => (
          <Box key={singleVariant.singleVariantControlId}>
            <FormControlLabel
              label={singleVariant.name}
              control={
                <Controller
                  name={`${variantName}.variants.${singleVariantIndex}.selected`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox checked={field.value} {...field} />
                  )}
                />
              }
            />
          </Box>
        ))}
      </Box>
    </Stack>
  );
}

export default ItemVariantForm;
