import { createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#212529",
      paper: "#555F70",
    },
    primary: {
      ...deepPurple,
      main: "#6D5676",
    },
  },
  extraPalette: {
    cardBg: "#543F5D",
  },
});
