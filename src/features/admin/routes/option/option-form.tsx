import { FormProvider, useForm } from "react-hook-form";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { Option } from "../../types/table-data";

type OptionProps = {
  onSubmit: (option: Option) => void;
  option?: Option;
};

function OptionForm({ option, onSubmit }: OptionProps) {
  const optionValues = useForm({
    defaultValues: option,
  });

  const updateOption = (data: Option) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...optionValues}>
      <form onSubmit={optionValues.handleSubmit(updateOption)}>
        <Stack spacing={2}>
          <FormControl>
            <TextField
              label="Name"
              {...optionValues.register("name")}
            ></TextField>
          </FormControl>
        </Stack>
        <Button
          sx={{ mt: 5 }}
          size="large"
          type="submit"
          variant="contained"
          endIcon={<ChevronRight />}
        >
          Abschicken
        </Button>
      </form>
    </FormProvider>
  );
}

export default OptionForm;
