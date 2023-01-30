import { ThemeProviderProps } from "@emotion/react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { theme } from "../lib";

const globalStyles = (
  <GlobalStyles
    styles={{
      "html, body, #root": {
        height: "100%",
      },
    }}
  />
);

function ThemeProvider({ children, ...rest }: Partial<ThemeProviderProps>) {
  return (
    <MuiThemeProvider theme={theme} {...rest}>
      {children}
      <CssBaseline />
      {globalStyles}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;