'use client';

import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import palette from './palette';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

// ----------------------------------------------------------------------

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
      typography: typography
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