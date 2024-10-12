'use client';

import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles';
import colorPalette from './color-palette';
import { componentOverrides } from './overrides';
import { merge } from 'lodash';
type Props = {
  children: React.ReactNode;
};

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
};

export default function MuiThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(() => {
    return createTheme({
      palette: colorPalette,
      typography: typography,
    });
  }, []);

  const theme = createTheme(memoizedValue as ThemeOptions);
  theme.components = merge(theme.components, componentOverrides(theme));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
