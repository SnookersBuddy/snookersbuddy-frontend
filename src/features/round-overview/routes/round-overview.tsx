import { BaseLayout } from "../../../components";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { SortedRound, UnpreparedRound } from "../types";
import React, { useState } from "react";
import { queryClient } from "../../../utils/query-client";

function fetchOpenRounds({
  signal,
}: QueryFunctionContext): Promise<SortedRound[]> {
  return fetch("/api/round?status=unprepared", {
    signal,
  })
    .then((res) => res.json())
    .then((res: UnpreparedRound[]) =>
      res
        .map((value) => ({
          id: value.id,
          orderedAt: value.orderedAt,
          orderedBy: value.orderedBy,
          orderedItemsByCategory: value.orderedItems.reduce(
            (previousValue, currentValue) => {
              previousValue[currentValue.category.name] = (
                previousValue[currentValue.category.name] || []
              ).concat(currentValue);
              return previousValue;
            },
            {} as SortedRound["orderedItemsByCategory"]
          ),
        }))
        .sort(
          (a, b) =>
            new Date(a.orderedAt).getTime() - new Date(b.orderedAt).getTime()
        )
    );
}

function updateMarkRoundAsPrepared(roundId: number) {
  return fetch(`/api/round/${roundId}/state`, {
    method: "put",
    body: JSON.stringify({ state: "PREPARED" }),
    headers: {
      "content-type": "application/json",
    },
  });
}

function formatShortDate(date: Date): string {
  return date.toLocaleString("de-De", {
    minute: "numeric",
    hour: "numeric",
    second: "numeric",
  });
}

const OrderedItemTypography = styled(Typography)`
  font-size: 1.4rem;
`;

const OrderedItemGrid = styled(Box)`
  display: grid;
  grid-template: "amount name options" ". variants variants" ". comment comment" / minmax(
      0,
      max-content
    ) minmax(0, 1fr) minmax(0, max-content) minmax(0, auto);
  column-gap: 4px;
  white-space: pre-wrap;
`;

const outletProps = { maxWidth: false } as const;

function RoundOverview() {
  // We can set this right away because this component suspends when running the query.
  const [lastSuccessfulRefreshTime, setLastSuccessfulRefreshTime] =
    useState<string>(formatShortDate(new Date()));


  const { data } = useQuery({
    queryKey: ["round-overview"],
    queryFn: fetchOpenRounds,
    refetchInterval: 5000,
    onSuccess: () => {
      setLastSuccessfulRefreshTime(formatShortDate(new Date()));
    },
  });
  const rounds = data!;

  const { mutate: markRoundAsPrepared } = useMutation({
    mutationFn: updateMarkRoundAsPrepared,
    onSuccess: () => {
      queryClient.invalidateQueries(["round-overview"]);
    },
  });

  const elements = rounds.map((round) => (
    <Paper key={round.id}>
      <Box display="flex" flexDirection="column" p={2} height="100%">
        <Typography variant="h4" align="center">
          {round.orderedBy}
        </Typography>
        <Typography align="center">
          {new Date(round.orderedAt).toLocaleString("de-De", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            minute: "numeric",
            hour: "numeric",
          })}
        </Typography>
        <Stack mt={2} spacing={1} mb={4}>
          {Object.values(round.orderedItemsByCategory).flatMap((orderedItems) =>
            orderedItems.map((orderedItem) => {
              const options = orderedItem.options.map((option) => (
                <Grid key={option.name} item xs="auto">
                  <Chip
                    sx={{ p: 0, color: "black", fontSize: "1.2rem" }}
                    label={option.name}
                    color={option.defaultValue ? "success" : "error"}
                  />
                </Grid>
              ));

              return (
                <OrderedItemGrid key={orderedItem.id}>
                  <OrderedItemTypography gridArea="amount" fontWeight="bold">
                    {orderedItem.amount}x
                  </OrderedItemTypography>
                  <OrderedItemTypography fontWeight="bold" gridArea="name">
                    {orderedItem.name}
                  </OrderedItemTypography>
                  <OrderedItemTypography gridArea="comment" fontStyle="italic">
                    {orderedItem.comment}
                  </OrderedItemTypography>
                  <OrderedItemTypography gridArea="variants">
                    {orderedItem.variants.reduce(
                      (previousValue, currentValue, currentIndex) =>
                        currentIndex === 0
                          ? currentValue.name
                          : `${previousValue} - ${currentValue.name}`,
                      ""
                    )}
                  </OrderedItemTypography>
                  <Grid gridArea="options" pl={1} container spacing={1}>
                    {options}
                  </Grid>
                </OrderedItemGrid>
              );
            })
          )}
        </Stack>
        <Button
          sx={{ mt: "auto", width: "max-content", alignSelf: "center" }}
          variant="contained"
          onClick={() => markRoundAsPrepared(round.id)}
        >
          Abschliessen
        </Button>
      </Box>
    </Paper>
  ));

  return (
    <BaseLayout title="Bestellübersicht" outletProps={outletProps}>
      <Typography variant="h2" fontWeight="bold">
        Offene Bestellungen: {rounds.length}
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
