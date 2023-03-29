import { useActiveRoundState } from "../../state/round";
import { BaseLayout } from "../../../../components";
import { Link as RouterLink } from "react-router-dom";
import { Button, Paper, Stack, Typography } from "@mui/material";
import ConfigEntry from "./config-entry";
import { Configuration } from "../../types/configuration";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCreateRoundMutation } from "../../hooks/use-create-round-mutation";
import { mapConfigsToRound } from "../../utils/map-configs-to-round";

function Overview() {
  const { configs, assignment, replaceConfig, resetAssignment } =
    useActiveRoundState();

  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateRoundMutation({
    onSuccess: () => {
      navigate("/assignments");
      resetAssignment(assignment.id);
    },
  });

  const submitBasket = () => {
    mutate(mapConfigsToRound(configs, assignment.id));
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
      <Stack mt={2} direction="row" spacing={1}>
        <Button component={RouterLink} to="../items" variant="contained">
          Zurück
        </Button>
        <Button
          fullWidth
          disabled={isLoading || !elements.length}
          onClick={submitBasket}
          variant="contained"
          endIcon={<ChevronRight />}
        >
          Abschicken
        </Button>
      </Stack>
    </BaseLayout>
  );
}

export default Overview;
