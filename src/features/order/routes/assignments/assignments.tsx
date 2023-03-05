import { BaseLayout } from "../../../../components";
import { Grid } from "@mui/material";
import { useAssignmentsQuery } from "../../hooks/use-assignments-query";
import AssignmentButton from "./assignment-button";

function Assignments() {
  const assignmentsQuery = useAssignmentsQuery({
    refetchOnMount: "always",
  });

  const assignments = assignmentsQuery
    .data!.filter((assignment) => !assignment.custom)
    .map((assignment) => (
      <Grid key={assignment.id} item xs={3} sx={{ aspectRatio: "1/1" }}>
        <AssignmentButton assignment={assignment} />
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
