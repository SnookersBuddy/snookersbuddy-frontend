import { useActiveRoundState } from "../../state/round";
import { BaseLayout } from "../../../../components";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ConfigEntry from "./config-entry";
import { Configuration } from "../../types/configuration";
import { ChevronRight } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { OrderedItem } from "../../types/item";
import { useNavigate } from "react-router-dom";

type Round = {
  assignmentId: number;
  orderedItems: OrderedItem[];
};

function createRound({ assignmentId, orderedItems }: Round) {
  const url = `/api/assignment/${assignmentId}/current-order/round`;
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderedItems),
  });
}

function Overview() {
  const { configs, assignment, replaceConfig, resetAssignment } =
    useActiveRoundState();

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: createRound,
    onSuccess: () => {
      navigate("/assignments");
      resetAssignment(assignment.id);
    },
  });
  const submitBasket = () => {
    const items = configs
      .map((itemConfig) => {
        // Only pull the selected variants (SingleVariant) from each variant group (Variant).
        const chosenVariants = itemConfig.variants.map(
          (group) =>
            group.variants.find(
              (variant) => variant.id === group.defaultVariantId
            )!
        );

        // We use ALL options (regardless of selected or not) because the waiter needs to know whether to include something or not.
        // If e.g. ice is the default for Cola and the waiter deselects it then in the big overview the deselected won't show.
        const chosenOptions = itemConfig.options;
        const comment = itemConfig.comment;
        const amount = itemConfig.amount;
        return {
          item: itemConfig.item,
          chosenVariants,
          chosenOptions,
          comment,
          amount,
        };
      })
      .filter((config) => config.amount != 0);
    mutate({ assignmentId: assignment.id, orderedItems: items });
  };

  const updateAmount = (config: Configuration) => (newAmount: number) => {
    replaceConfig({
      ...config,
      amount: newAmount,
    });
  };

  const elements = configs.map((config, index) => (
    <ConfigEntry
      key={index}
      config={config}
      onAmountChange={updateAmount(config)}
    />
  ));

  return (
    <BaseLayout title="Bestellübersicht">
      <Paper sx={{ p: 2 }}>
        <Typography align="center" variant="h4">
          {assignment.displayName}
        </Typography>
        {elements.length ? (
          <Stack mt={2} spacing={1}>
            {elements}
          </Stack>
        ) : (
          <Typography align="center">Bestellung ist leer</Typography>
        )}
      </Paper>
      <Box display="flex" justifyContent="center">
        <Button
          disabled={isLoading || !elements.length}
          onClick={submitBasket}
          sx={{ mt: 2 }}
          variant="contained"
          endIcon={<ChevronRight />}
        >
          Abschicken
        </Button>
      </Box>
    </BaseLayout>
  );
}

export default Overview;
