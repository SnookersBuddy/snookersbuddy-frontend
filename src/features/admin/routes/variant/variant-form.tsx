import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { ChevronRight, Delete } from "@mui/icons-material";
import { Variant } from "../../types/table-data";
import { useState } from "react";

type VariantFormProps = {
  onSubmit: (variant: Variant) => void;
  variant?: Variant;
};

function VariantForm({ variant, onSubmit }: VariantFormProps) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: variant ?? {
      variantGroup: {
        name: "",
      },
      singleVariants: [],
    },
  });

  function updateVariant(data: Variant) {
    onSubmit(data);
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "singleVariants",
    keyName: "inputId",
  });

  console.log(fields);

  const variants = fields?.map(
    ({ name, id, inputId }, index) => [index, inputId] as const
  );

  const [newSingleVariantName, setNewSingleVariantName] = useState("");
  const handleAddSingleVariantClick = () => {
    console.log(newSingleVariantName);
    append({
      name: newSingleVariantName,
    });
    setNewSingleVariantName("");
  };

  const getRemoveSingleVariantClickHandler = (index: number) => () => {
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(updateVariant)}>
      <Stack spacing={2}>
        <FormControl>
          <TextField label="Name" {...register("variantGroup.name")} />
        </FormControl>
        <Typography>Existierende Ausprägungen:</Typography>
        {variants.map(([index, inputId]) => (
          <FormControl key={inputId}>
            <TextField
              label="Name"
              {...register(`singleVariants.${index}.name`)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={getRemoveSingleVariantClickHandler(index)}
                      edge="end"
                    >
                      <Delete />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        ))}
        <Divider />
        <Box display="flex">
          <FormControl fullWidth>
            <TextField
              label="Neue Ausprägung hinzufügen..."
              value={newSingleVariantName}
              onChange={(event) => setNewSingleVariantName(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleAddSingleVariantClick();
                  event.preventDefault();
                }
              }}
            />
          </FormControl>
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            onClick={handleAddSingleVariantClick}
          >
            OK
          </Button>
        </Box>
        <Button
          sx={{ mt: 5 }}
          size="large"
          type="submit"
          variant="contained"
          endIcon={<ChevronRight />}
        >
          Abschicken
        </Button>
      </Stack>
    </form>
  );
}

export default VariantForm;
