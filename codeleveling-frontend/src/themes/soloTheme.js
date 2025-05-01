import { createTheme } from '@mui/material/styles';

const soloTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4b6cb7', // magical blue
    },
    secondary: {
      main: '#182848', // deep dark
    },
    background: {
      default: '#0f0f23',
      paper: '#1a1a2e',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default soloTheme;
