import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Configuration } from "../../types/configuration";
import { BaseLayout } from "../../../../components";
import { FormProvider, useForm } from "react-hook-form";
import { Cancel, ChevronRight } from "@mui/icons-material";
import Variants from "./variants";
import Options from "./options";
import {
  positiveNumberTransformer,
  TransformController,
} from "../../../../components/transform-controller";
import { useRoundState } from "../../state/round";
import useConfigurationQuery from "../../hooks/use-configuration-query";
import { useStrongParams } from "../../../../hooks/use-strong-params";

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

function Configurator() {
  const { assignmentId, itemId } = useStrongParams("assignmentId", "itemId");

  const { data: configuration } = useConfigurationQuery(itemId);

  const formValues = useForm({
    defaultValues: configuration,
  });

  const { upsertConfigurationFor } = useRoundState();
  const navigate = useNavigate();
  const saveConfigurationToBasket = (data: Configuration) => {
    upsertConfigurationFor(+assignmentId, data);
    navigate("..");
  };

  const decrementAmount = () => {
    const currentAmount = formValues.getValues("amount");
    if (currentAmount > 1) {
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
            <Typography textAlign="center" variant="h4">
              {configuration!.item.itemName}
            </Typography>
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
                      fullWidth
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
            <Stack direction="row" spacing={1}>
              <Button
                component={RouterLink}
                to=".."
                size="large"
                variant="contained"
                endIcon={<Cancel />}
              >
                Zurück
              </Button>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                endIcon={<ChevronRight />}
              >
                Abschicken
              </Button>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </BaseLayout>
  );
}

export default Configurator;
