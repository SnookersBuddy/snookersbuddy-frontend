import { Assignment } from "../../../order/types/assignment";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

import { ChevronRight } from "@mui/icons-material";

type AssignmentProps = {
  onSubmit: (assignment: Assignment) => void;
  assignment?: Assignment;
};

function AssignmentForm({ assignment, onSubmit }: AssignmentProps) {
  const { handleSubmit, register, control } = useForm({
    defaultValues: assignment,
  });

  const updateAssignment = (data: Assignment) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(updateAssignment)}>
      <Stack spacing={2}>
        <FormControl>
          <TextField label="Name" {...register("displayName")}></TextField>
        </FormControl>
        <FormControl>
          <TextField
            label="Abkürzung"
            {...register("abbreviation")}
          ></TextField>
        </FormControl>
        <FormControlLabel
          label="Stammkunde"
          control={
            <Controller
              control={control}
              name="custom"
              render={({ field }) => (
                <Checkbox checked={field.value} {...field} />
              )}
            />
          }
        />
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
  );
}

export default AssignmentForm;
