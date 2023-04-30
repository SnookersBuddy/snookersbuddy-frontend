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
    success: {
      main: "#63BCE4",
    },
  },
  extraPalette: {
    cardBg: "#543F5D",
    success: "#74BF6E",
    error: "#BF5E58E5",
  },
});
