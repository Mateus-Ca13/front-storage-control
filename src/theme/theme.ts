import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      dark: "#371B08",
      main: "#523320",
      light: "#988273",
    },
    secondary: {
      dark: "#303f9f",
      main: "#3f51b5",
      light: "#c5cae9",
    },
    background: {
      default: "#F5F5F5",

    },
    common: {
        black: "#161616ff",
        white: "#fff",
    },
  },
  typography: {
    fontFamily: "Raleway, sans-serif"
  },
  shape: {
    borderRadius: 16,
  },

});