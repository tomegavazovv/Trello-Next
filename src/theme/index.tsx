'use client';

import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import palette from './palette';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { cursorTo } from 'readline';

type Props = {
  children: React.ReactNode;
};

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
};

export default function MuiThemeProvider({ children }: Props) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      typography: typography,
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-disabled': {
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                pointerEvents: 'auto',
              },
              '&.Mui-disabled:hover': { 
                cursor: 'not-allowed',
              },
            },
            
          }
        }
      }
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}