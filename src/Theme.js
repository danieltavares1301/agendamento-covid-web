import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: '#F0F0F0',
    },
    secondary: {
      default: '#fff',
    },
    error: {
      main: '#C70000',
    },
    button: {
      add: 'green',
      delete: 'red',
      update: 'blue',
    },
  },
});

export default theme;
