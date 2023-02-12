import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { SortedRound } from "../types";
import OrderedItemEntry from "./ordered-item-entry";

type RoundCardProps = {
  round: SortedRound;
  onPrepareRound: (roundId: number) => void;
};

function RoundCard({ round, onPrepareRound }: RoundCardProps) {
  function handleRoundPrepareClick() {
    onPrepareRound(round.id);
  }

  return (
    <Paper>
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
          {Object.entries(round.orderedItemsByCategory).flatMap(
            ([category, orderedItems]) => (
              <OrderedItemEntry key={category} items={orderedItems} />
            )
          )}
        </Stack>
        <Button
          sx={{ mt: "auto", width: "max-content", alignSelf: "center" }}
          variant="contained"
          onClick={handleRoundPrepareClick}
        >
          Abschliessen
        </Button>
      </Box>
    </Paper>
  );
}

export default RoundCard;
