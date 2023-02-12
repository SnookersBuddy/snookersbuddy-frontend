import { BaseLayout } from "../../../components";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { queryClient } from "../../../lib";
import { useOpenRoundsQuery } from "../hooks/use-open-rounds-query";
import { usePrepareRoundMutation } from "../hooks/use-prepare-round-mutation";
import RoundCard from "./round-card";
import { formatShortDate } from "../utils/format-short-date";

const OUTLET_PROPS = { maxWidth: false } as const;

function RoundOverview() {
  // We can set this right away because this component suspends when running the query.
  const [lastSuccessfulRefreshTime, setLastSuccessfulRefreshTime] =
    useState<string>(formatShortDate(new Date()));

  const { data: rounds } = useOpenRoundsQuery({
    refetchInterval: 5000,
    onSuccess: () => {
      setLastSuccessfulRefreshTime(formatShortDate(new Date()));
    },
  });

  const { mutate: markRoundAsPrepared } = usePrepareRoundMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["round-overview"]);
    },
  });

  const elements = rounds!.map((round) => (
    <RoundCard
      key={round.id}
      round={round}
      onPrepareRound={markRoundAsPrepared}
    />
  ));

  return (
    <BaseLayout title="Bestellübersicht" outletProps={OUTLET_PROPS}>
      <Typography variant="h2" fontWeight="bold">
        Offene Bestellungen: {rounds!.length}
      </Typography>
      <Typography color="grey.400">
        Zuletzt aktualisiert: {lastSuccessfulRefreshTime}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(450px, 1fr))"
        gap={2}
        mt={2}
      >
        {elements}
      </Box>
    </BaseLayout>
  );
}

export default RoundOverview;
