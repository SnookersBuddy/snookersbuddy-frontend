import { ReactNode, Suspense } from "react";
import {
  AppBar,
  Box,
  BoxProps,
  Button,
  Container, IconButton,
  Typography
} from "@mui/material";
import { Link as RouterLink, useMatch } from "react-router-dom";
import { theme } from "../../lib";
import { Home } from "@mui/icons-material";

type BaseLayoutProps = {
  title: string;
  children: ReactNode;
  outletProps?: BoxProps;
};

function BaseLayout({ title, children, outletProps = {} }: BaseLayoutProps) {
  const { sx, ...outletPropsRest } = outletProps;
  const isAnwendungsauswahl = useMatch("/");

  return (
    <>
      <AppBar
        sx={{ py: 1, backgroundColor: "primary.main" }}
        position="relative"
      >
        <Container maxWidth="xs">
          <Typography textAlign="center" variant="h6">
            {title}
          </Typography>
        </Container>
        {!isAnwendungsauswahl && (
          <IconButton
            aria-label="home"
            component={RouterLink}
            to="/"
            sx={{
              position: "absolute",
              right: theme.spacing(1),
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Home/>
          </IconButton>
        )}
      </AppBar>
      <Box component="main" sx={{ m: 2, ...sx }} {...outletPropsRest}>
        <Suspense fallback="Laden...">{children}</Suspense>
      </Box>
    </>
  );
}

export default BaseLayout;
