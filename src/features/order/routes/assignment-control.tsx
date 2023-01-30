import { Outlet } from "react-router-dom";
import { memo, useEffect } from "react";
import { useRoundState } from "../state/round";
import { useMutation } from "@tanstack/react-query";
import { Assignment } from "../types/assignment";
import { Typography } from "@mui/material";
import { useActiveAssignment } from "../hooks/use-active-assignment";

function createOrder(assignment: Assignment) {
  return fetch("/api/order", {
    body: JSON.stringify({ assignment }),
    method: "post",
    headers: {
      "content-type": "application/json",
    },
  });
}

function AssignmentControl() {
  const assignment = useActiveAssignment();

  const { resetAssignment } = useRoundState();

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: createOrder,
  });

  useEffect(() => {
    // Create order
    mutate(assignment);
  }, [assignment, mutate]);

  useEffect(() => {
    // Reset the order state for this assignment if entering.
    resetAssignment(assignment.id);
  }, [assignment.id, resetAssignment]);

  if (isLoading) {
    return <Typography>Bestellung initialisieren...</Typography>;
  }

  if (isSuccess) {
    return <Outlet />
  }

  return null;
}

export default memo(AssignmentControl);
