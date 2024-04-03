import { createTheme } from "@mui/material/styles";

export const theme = 
createTheme({
  palette: {
    primary: {
      main: "#2258AE",
    },
    secondary: {
      main: "#FFFFFF",
    },
    btn_white: {
      main: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 2, // defaults to 4
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "3rem",
          outline: "none",
          // color: "BLACK",
          textTransform: "capitalize",
        },
      },
    },
  },
});
