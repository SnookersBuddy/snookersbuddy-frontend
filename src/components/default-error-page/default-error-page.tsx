import { Box, Stack, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { theme } from "../../lib";
import { IntrospectionError } from "../../state/introspection";

function DefaultErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Typography component="code">
          Die Seite wurde nicht gefunden.
        </Typography>
      );
    }

    return (
      <Typography component="code">
        Ein komischer Routing-Fehler: {error.statusText}
      </Typography>
    );
  }

  if (error instanceof IntrospectionError) {
    return (
      <Stack p={2}>
        <Typography variant="h3" fontWeight="bold">
          Debug error thrown:
        </Typography>
        <Typography fontSize="1.2rem" component="code">
          <b>{error.name}</b>: {error.message}
        </Typography>
      </Stack>
    );
  }

  if (error instanceof Error) {
    return (
      <Stack p={2}>
        <Typography variant="h3" fontWeight="bold">
          Etwas ist schiefgelaufen:
        </Typography>
        <Typography fontSize="1.2rem" component="code">
          <b>{error.name}</b>: {error.message}
        </Typography>

        <Box mt={2} p={1} bgcolor={theme.palette.grey.A400}>
          <Typography color={theme.palette.grey.A700} component="code">
            {error.stack}
          </Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack>
      <Typography>Etwas ist schiefgelaufen:</Typography>
      {typeof error === "object" && (
        <Typography component="code">{JSON.stringify(error)}</Typography>
      )}
    </Stack>
  );
}

export default DefaultErrorPage;
