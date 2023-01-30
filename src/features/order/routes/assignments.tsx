import { BaseLayout } from "../../../components";
import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAssignmentsQuery } from "../hooks/use-assignments-query";

function Assignments() {
  const assignmentsQuery = useAssignmentsQuery();

  const assignments = assignmentsQuery
    .data!.filter((assignment) => !assignment.custom)
    .map((assignment) => (
      <Grid key={assignment.id} item xs={3} sx={{ aspectRatio: "1/1" }}>
        <Button
          variant="contained"
          component={RouterLink}
          to={`${assignment.id}/items`}
          sx={{ width: "100%", height: "100%" }}
        >
          {assignment.abbreviation}
        </Button>
      </Grid>
    ));

  return (
    <BaseLayout title="Tischauswahl">
      <Grid container spacing={1}>
        {assignments}
      </Grid>
    </BaseLayout>
  );
}

export default Assignments;
