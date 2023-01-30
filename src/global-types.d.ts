export {}

declare module '@mui/material/styles' {
  interface Theme {
    extraPalette: {
      cardBg: string;
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    extraPalette?: {
      cardBg?: string
    };
  }
}
