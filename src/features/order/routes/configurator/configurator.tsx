import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import {
  Configuration,
  Option,
  SingleVariant,
} from "../../types/configuration";
import { BaseLayout } from "../../../../components";
import { FormProvider, useForm } from "react-hook-form";
import { ChevronRight, DoubleArrow } from "@mui/icons-material";
import Variants from "./variants";
import Options from "./options";
import {
  positiveNumberTransformer,
  TransformController,
} from "../../../../components/transform-controller";
import { useRoundState } from "../../state/round";
import useConfigurationQuery from "../../hooks/use-configuration-query";
import { useStrongParams } from "../../../../hooks/use-strong-params";
import { useCreateRoundMutation } from "../../hooks/use-create-round-mutation";
import { OrderedItem } from "../../types/item";
import { useActiveAssignment } from "../../hooks/use-active-assignment";

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

  const activeAssignment = useActiveAssignment();
  const { resetAssignment } = useRoundState();

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

  const fastCheckout = () => {
    //TODO Add validation here, if there is some validation needed in future (such as max char for comment).
    const chosenOptions: Option[] = formValues
      .getValues()
      .options.filter((option) => option.defaultValue)
      .map((option) => ({
        id: option.id,
        name: option.name,
        defaultValue: option.defaultValue,
      }));

    const chosenVariants: SingleVariant[] = formValues
      .getValues()
      .variants.map(
        (group) =>
          group.variants.find(
            (variant) => variant.id === group.defaultVariantId
          )!
      );

    const orderedItem = {
      item: formValues.getValues().item,
      chosenVariants: chosenVariants,
      chosenOptions: chosenOptions,
      comment: formValues.getValues().comment,
      amount: formValues.getValues().amount,
    };
    const orderedItems: OrderedItem[] = [];
    orderedItems.push(orderedItem);
    mutate({
      assignmentId: activeAssignment.id,
      orderedItems: orderedItems,
    });
  };

  const { mutate } = useCreateRoundMutation({
    onSuccess: () => {
      navigate("/assignments");
      resetAssignment(activeAssignment.id);
    },
  });

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
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                endIcon={<ChevronRight />}
              >
                Zur Runde hinzufügen
              </Button>
            </Stack>
            <Button
              fullWidth
              color={"success"}
              size="large"
              onClick={() => fastCheckout()}
              variant="contained"
              endIcon={<DoubleArrow />}
            >
              Direkt bestellen
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </BaseLayout>
  );
}

export default Configurator;
