import { createTheme, darken, lighten } from "@mui/material";


type OwnPalleteColor = {
  dark?: string;
  main: string;
  light?: string;
}
// Extensão dos tipos do MUI para incluir categoryColors
declare module "@mui/material/styles" {
  interface Palette {
    categoryColors: Record<string, OwnPalleteColor>;
  }
  interface PaletteOptions {
    categoryColors?: Record<string, OwnPalleteColor>;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      dark: "#3a2417ff",
      main: "#523320",
      light: "#887466ff",
    },
    secondary: {
      dark: "#68594fff",
      main: "#887466ff",
      light: "#f1e6ddff",
    },
    background: {
      default: "#F5F5F5",

    },
    common: {
        black: "#161616ff",
        white: "#fff",
    },
    warning: {
      
        main: "#ff9800",
        light: lighten('#ff9800', 0.9),
        dark: darken('#ff9900ff', 0.2),
    },
    error: {
        main: "#f44336",
        light: lighten('#f44336', 0.9),
        dark: darken('#f44336', 0.2),
    },
    info: {
        
        main: "#3f51b5",
        light: lighten('#3f51b5', 0.9),
        dark: darken('#3f51b5', 0.2),
    },
    success: {
        main: "#4caf50",  
        light: lighten('#4caf50', 0.9),
        dark: darken('#4caf50', 0.2),
    },
    categoryColors: {
        category1:{ main: "#ff4141ff", light: lighten('#ff4141ff', 0.9), dark: darken('#ff4141ff', 0.2)},
        category2: { main: "#2fbdffff", light: lighten('#2fbdffff', 0.9), dark: darken('#2fbdffff', 0.2)},
        category3: {main:"#ff9448ff", light: lighten('#ff9448ff', 0.9), dark: darken('#ff9448ff', 0.2)},
        category4: { main:"#85ac3eff", light: lighten('#85ac3eff', 0.9), dark: darken('#85ac3eff', 0.2)},
        category5: { main:"#ebda26ff", light: lighten('#ebda26ff', 0.9), dark: darken('#ebda26ff', 0.2)},
        category6: { main:"#ff69d9ff", light: lighten('#ff69d9ff', 0.9), dark: darken('#ff69d9ff', 0.2)},
        category7: { main:"#a732caff", light: lighten('#a732caff', 0.9), dark: darken('#a732caff', 0.2)},
        category8: { main:"#2ee7c8ff", light: lighten('#2ee7c8ff', 0.9), dark: darken('#2ee7c8ff', 0.2)},
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd", 
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    }
  },
  typography: {
    fontFamily: "Instrument Sans, sans-serif"
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },

});