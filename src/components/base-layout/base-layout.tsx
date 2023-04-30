import { ReactNode } from "react";
import {
  AppBar,
  Container,
  ContainerProps,
  IconButton,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useMatch, useNavigate } from "react-router-dom";
import { theme } from "../../lib";
import { Suspense } from "react";
import { ArrowBack, Home } from "@mui/icons-material";

type BaseLayoutProps = {
  title: string;
  children: ReactNode;
  outletProps?: ContainerProps;
};

function BaseLayout({ title, children, outletProps = {} }: BaseLayoutProps) {
  const { sx, ...outletPropsRest } = outletProps;
  const isAnwendungsauswahl = useMatch("/");
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AppBar
        sx={{ py: 1, backgroundColor: "primary.main" }}
        position="relative"
      >
        {!isAnwendungsauswahl && (
          <IconButton
            aria-label="back"
            onClick={navigateBack}
            sx={{
              position: "absolute",
              left: theme.spacing(1),
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Container maxWidth={"xs"}>
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
            <Home />
          </IconButton>
        )}
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mt: theme.spacing(3), ...sx }}
        {...outletPropsRest}
      >
        <Suspense fallback="Laden...">{children}</Suspense>
      </Container>
    </>
  );
}

export default BaseLayout;
