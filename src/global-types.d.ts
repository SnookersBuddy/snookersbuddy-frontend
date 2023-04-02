export {};

declare module "@mui/material/styles" {
  interface Theme {
    extraPalette: {
      cardBg: string;
      success: string;
      error: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    extraPalette?: {
      cardBg?: string;
      success?: string;
      error?: string;
    };
  }
}
