/* eslint-disable object-curly-newline */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: '15px' } } },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#005882',
          height: '45px',
          borderRadius: '15px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#f2f5f9',
            zIndex: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '18px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { color: '#005882' } },
    },
    MuiButton: {
      styleOverrides: {
        contained: { backgroundColor: '#004668' },
        root: { borderRadius: '13px', fontSize: '0.875rem', fontWeight: 600 },
      },
    },
    MuiIcon: { styleOverrides: { colorPrimary: '#005882' } },
  },

  palette: {
    primary: { main: '#005882' },
    secondary: { main: '#f2f5f9' },
    mode: 'light',
  },
});

export default theme;
