import { Assignment } from "../../../order/types/assignment";
import { Controller, FieldError, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

import { ChevronRight } from "@mui/icons-material";
import { getErrorText } from "../../../../utils/input-validation";

type AssignmentProps = {
  onSubmit: (assignment: Assignment) => void;
  assignment?: Assignment;
};

function AssignmentForm({ assignment, onSubmit }: AssignmentProps) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: assignment,
  });

  const updateAssignment = (data: Assignment) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(updateAssignment)}>
      <Stack spacing={2}>
        <FormControl>
          <TextField
            label="Name"
            error={!!errors.displayName}
            helperText={getErrorText(errors.displayName)}
            {...register("displayName", { required: true })}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Abkürzung"
            error={!!errors.abbreviation}
            helperText={getErrorText(errors.abbreviation)}
            {...register("abbreviation", { required: true })}
          />
        </FormControl>
        <FormControlLabel
          label="Stammkunde"
          control={
            <Controller
              control={control}
              name="custom"
              defaultValue={false}
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
