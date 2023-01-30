import { ReactNode } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useMatch } from "react-router-dom";
import { theme } from "../../lib";
import { Home } from "@mui/icons-material";

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

  return (
    <FixedContentWrapper>
      <AppBar sx={{ py: 1, backgroundColor: "primary.main" }} position="relative">
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
      <Box sx={{ p: 2 }}>{header}</Box>
      <Box component="main" sx={{ p: 2, overflow: "scroll" }}>
        {content}
      </Box>
      <Box component="footer" sx={{ p: 2 }}>
        {footer}
      </Box>
    </FixedContentWrapper>
  );
}

export default FixedContentLayout;
