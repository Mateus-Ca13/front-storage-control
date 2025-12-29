import { darken, lighten, type ThemeOptions } from "@mui/material";


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

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      dark: "#fcebddff",
      main: "#f8ece2ff",
      light: "#d4d4d4ff",
    },
    secondary: {
      dark: "#a7988eff",
      main: "#b4a192ff",
      light: "#363433ff",
    },
    common: {
        black: "#ffe7d9ff",
        white: "#1a1a1aff",
    },
    background: {
        default: "#141414ff",
    },
    warning: {
        main: "#ff9800",
        light: lighten('#ff9800', 0.2),
        dark: darken('#ff9900ff', 0.6),
    },
    error: {
        main: "#f44336",
        light: lighten('#f44336', 0.2),
        dark: darken('#f44336', 0.6),
    },
    info: {
        main: "#71acf8ff",
        light: lighten('#3f51b5', 0.2),
        dark: darken('#3f51b5', 0.6),
    },
    success: {
        main: "#8df091ff",  
        light: lighten('#8df091ff', 0.2),
        dark: darken('#4cdd50ff', 0.6),
    },
    categoryColors: {
        category1:{ main: "#ff4141ff", light: lighten('#ff4141ff', 0.1), dark: darken('#ff4141ff', 0.8)},
        category2: { main: "#2fbdffff", light: lighten('#2fbdffff', 0.1), dark: darken('#2fbdffff', 0.8)},
        category3: {main:"#ff9448ff", light: lighten('#ff9448ff', 0.1), dark: darken('#ff9448ff', 0.8)},
        category4: { main:"#85ac3eff", light: lighten('#85ac3eff', 0.1), dark: darken('#85ac3eff', 0.8)},
        category5: { main:"#ebda26ff", light: lighten('#ebda26ff', 0.1), dark: darken('#ebda26ff', 0.8)},
        category6: { main:"#ff69d9ff", light: lighten('#ff69d9ff', 0.1), dark: darken('#ff69d9ff', 0.8)},
        category7: { main:"#a732caff", light: lighten('#a732caff', 0.1), dark: darken('#a732caff', 0.8)},
        category8: { main:"#2ee7c8ff", light: lighten('#2ee7c8ff', 0.1), dark: darken('#2ee7c8ff', 0.8)},
    },
    grey: {
      900: "#fafafa",
      800: "#f5f5f5",
      700: "#eeeeee",
      600: "#e0e0e0",
      500: "#bdbdbd", 
      400: "#9e9e9e",
      300: "#1d1d1dff",
      200: "#616161",
      100: "#424242",
      50: "#212121",
    }
  },
  components: {
    MuiDialog: {
        styleOverrides: {
            paper: {
                backgroundColor: "#000000ff",
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: "#272727ff",
            }
        }
    },
    MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: '#554434ff',
            color: '#fff'
          }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: "#272727ff",
            }
        }
    }
  
  },
  typography: {
    fontFamily: "Instrument Sans, sans-serif"
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },

};