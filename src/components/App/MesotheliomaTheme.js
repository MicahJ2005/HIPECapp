import { createMuiTheme } from '@material-ui/core/styles';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#c6c6c6',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      paper: "#fff",
      default: "#fff"
    },
    // error: will use the default color
  },
  typography: {
    useNextVariants: true,
    fontSize: 16,
  },
  overrides: {
    MuiExpansionPanelSummary: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        // backgroundColor: '#888888', // Some CSS
      },
    },
  },
});

export default appTheme;