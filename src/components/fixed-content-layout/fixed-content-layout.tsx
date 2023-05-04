import { ReactNode } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useMatch, useNavigate } from "react-router-dom";
import { theme } from "../../lib";
import { ArrowBack, Home } from "@mui/icons-material";

type FixedContentLayoutProps = {
  title: string;
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
};

const FixedContentWrapper = styled(Box)`
  display: grid;
  height: 100%;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
`;

function FixedContentLayout({
  title,
  content,
  footer,
  header,
}: FixedContentLayoutProps) {
  const isAnwendungsauswahl = useMatch("/");

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <FixedContentWrapper>
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
            <Home />
          </IconButton>
        )}
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {header}
      </Container>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mt: 2, overflowY: "scroll" }}
      >
        {content}
      </Container>
      <Container component="footer" maxWidth="sm" sx={{ my: 2 }}>
        {footer}
      </Container>
    </FixedContentWrapper>
  );
}

export default FixedContentLayout;
