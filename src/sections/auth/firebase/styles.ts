import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';

export const StyledAuthButton = styled(LoadingButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiCircularProgress-root': {
    color: 'white',
  },
}));

export const StyledTextField = styled(TextField)(({theme}) => ({
  backgroundColor: 'white',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: '0.7px'
    },
   
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.8)',
      borderWidth: '1.5px'
    },
  },
}))

export const StyledAuthCard = styled(Box)(({theme}) => ({
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(5),
  marginTop: theme.spacing(10),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)', 
}));