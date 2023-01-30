import { Configuration, Variant } from "../../types/configuration";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  numberTransformer,
  TransformController,
} from "../../../../components/transform-controller";

function idSort<T extends { id: number }>(a: T, b: T): number {
  return a.id - b.id;
}

function Variants() {
  const { getValues, control } = useFormContext<Configuration>();
  const variants = getValues("variants") as Variant[];

  const variantElements = variants.map((variant, index) => (
    <FormControl key={variant.name}>
      <FormLabel id={`variant-${variant.name}-label`}>{variant.name}</FormLabel>
      <TransformController
        control={control}
        name={`variants.${index}.defaultVariantId`}
        transform={numberTransformer}
        render={({ field }) => (
          <RadioGroup
            row
            aria-labelledby={`variant-${variant.name}-label`}
            {...field}
          >
            {variant.variants.sort(idSort).map((singleVariant) => (
              <FormControlLabel
                control={<Radio />}
                key={singleVariant.name}
                value={singleVariant.id}
                label={singleVariant.name}
              />
            ))}
          </RadioGroup>
        )}
      ></TransformController>
    </FormControl>
  ));

  return <Stack spacing={1} mt={0.5}>{variantElements}</Stack>;
}

export default Variants;
