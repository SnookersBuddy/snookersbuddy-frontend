import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Configuration } from "../../types/configuration";
import { invariant } from "../../../../utils/invariant";
import { BaseLayout } from "../../../../components";
import { FormProvider, useForm } from "react-hook-form";
import { ChevronRight } from "@mui/icons-material";
import Variants from "./variants";
import Options from "./options";
import {
  TransformController,
  ValueTransformer,
} from "../../../../components/transform-controller";
import { ChangeEvent } from "react";
import { useRoundState } from "../../state/round";

const positiveNumberTransformer: ValueTransformer<number> = {
  toInput: (value) => value.toString(),
  toOutput: (outputRaw) => {
    const event = outputRaw as ChangeEvent<HTMLInputElement>;
    const output = Number.parseInt(event.target.value, 10);
    // Only return output if it's a positive number.
    return isNaN(output) ? 0 : output < 0 ? 0 : output;
  },
};

const textFieldWithoutArrayStyles: SxProps = {
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    m: 0,
  },

  /* Firefox */
  "input[type=number]": {
    MozAppearance: "textfield",
  },
};

function getConfiguration(itemId: string): Promise<Configuration> {
  return fetch(`/api/item/${itemId}/configuration`).then((res) => res.json());
}

function Configurator() {
  const { assignmentId, itemId } = useParams();
  invariant(assignmentId, "assignmentId must be set in the params");
  invariant(itemId, "itemId must be set in the params");

  const { data: configuration } = useQuery({
    queryKey: ["configurator", itemId],
    queryFn: () => getConfiguration(itemId),
  });

  const formValues = useForm({
    defaultValues: configuration,
  });

  const { upsertConfigurationFor } = useRoundState();
  const navigate = useNavigate();
  const saveConfigurationToBasket = (data: Configuration) => {
    upsertConfigurationFor(+assignmentId, data);
    navigate("..")
  };

  const decrementAmount = () => {
    const currentAmount = formValues.getValues("amount");
    if (currentAmount > 0) {
      formValues.setValue("amount", currentAmount - 1);
    }
  };

  const incrementAmount = () => {
    formValues.setValue("amount", formValues.getValues("amount") + 1);
  };

  return (
    <BaseLayout title="Konfigurator">
      <FormProvider {...formValues}>
        <form onSubmit={formValues.handleSubmit(saveConfigurationToBasket)}>
          <Stack spacing={2}>
            <Box>
              <Typography textTransform="uppercase">Basis-Varianten</Typography>
              <Variants />
            </Box>
            <Box>
              <Typography textTransform="uppercase">Zusatzoptionen</Typography>
              <Options />
            </Box>
            <Stack spacing={1}>
              <Typography textTransform="uppercase">Abschluss</Typography>
              <TextField label="Notiz" {...formValues.register("comment")} />
              <Stack direction="row" spacing={1}>
                <Button onClick={decrementAmount} variant="contained">
                  -
                </Button>
                <TransformController
                  control={formValues.control}
                  name="amount"
                  transform={positiveNumberTransformer}
                  render={({ field }) => (
                    <TextField
                      sx={textFieldWithoutArrayStyles}
                      type="number"
                      {...field}
                    />
                  )}
                />
                <Button onClick={incrementAmount} variant="contained">
                  +
                </Button>
              </Stack>
            </Stack>
            <Button
              size="large"
              type="submit"
              variant="contained"
              endIcon={<ChevronRight />}
            >
              Abschicken
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </BaseLayout>
  );
}

export default Configurator;
