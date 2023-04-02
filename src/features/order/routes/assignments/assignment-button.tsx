import { Assignment, AssignmentAvailability } from "../../types/assignment";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { theme } from "../../../../lib";

function getAssignmentColor(availability: AssignmentAvailability): string {
  switch (availability) {
    case AssignmentAvailability.Free:
      return theme.extraPalette.success;
    case AssignmentAvailability.Occupied:
    case AssignmentAvailability.Reserved:
    case AssignmentAvailability.Blocked:
      return theme.extraPalette.error;
  }
}

type AssignmentButtonProps = {
  assignment: Assignment;
};

function AssignmentButton({ assignment }: AssignmentButtonProps) {
  const color = getAssignmentColor(assignment.availability);

  return (
    <Button
      variant="contained"
      component={RouterLink}
      to={`${assignment.id}/items`}
      sx={{ width: "100%", height: "100%", backgroundColor: color }}
    >
      {assignment.abbreviation}
    </Button>
  );
}

export default AssignmentButton;
