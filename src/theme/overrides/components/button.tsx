import { alpha, Palette, PaletteColor, Theme } from '@mui/material/styles';
import { ButtonProps, buttonClasses } from '@mui/material/Button';

export function button(theme: Theme) {
  const rootStyles = (ownerState: ButtonProps) => {

    const containedVariant = ownerState.variant === 'contained';
    
    const defaultStyle = {
      ...(containedVariant && {
        color: 'white',
        textTransform: 'none',
        fontWeight: 600,
      }),
    };

    const disabledState = {
      [`&.${buttonClasses.disabled}`]: {
        backgroundColor: alpha(
          (theme.palette[ownerState.color as keyof Palette] as PaletteColor)
            .main,
          0.6
        ),
        pointerEvents: 'auto',
        color: 'white',
        '&:hover': {
          cursor: 'not-allowed',
        },
      },
    };
    return [defaultStyle, disabledState];
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
