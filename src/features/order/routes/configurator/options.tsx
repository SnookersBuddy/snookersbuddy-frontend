import { Configuration, Option } from "../../types/configuration";
import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function Options() {
  const { getValues, control } = useFormContext<Configuration>();
  const options = getValues("options") as Option[];

  const optionElements = options.map((option, index) => (
    <FormControlLabel
      key={option.name}
      label={option.name}
      control={
        <Controller
          control={control}
          name={`options.${index}.defaultValue`}
          render={({ field }) => <Checkbox checked={field.value} {...field} />}
        />
      }
    />
  ));

  return (
    <FormGroup>
     {optionElements}
    </FormGroup>
  );
}

export default Options;
