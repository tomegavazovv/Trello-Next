import { InputAdornmentProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export function inputAdornment(theme: Theme) {
  const rootStyles = (ownerState: InputAdornmentProps) => {

    const defaultStyle = {
      color: 'rgba(0, 0, 0, 0.4)',
      '& .MuiSvgIcon-root': {
        fontSize: '20px',
      },
    };

    return [defaultStyle];
  };

  return {
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: InputAdornmentProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
