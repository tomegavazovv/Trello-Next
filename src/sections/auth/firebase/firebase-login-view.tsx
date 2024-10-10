'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/context/firebase/auth-provider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import LoginIcon from '@mui/icons-material/Login';
import styles from './auth-form.module.css';
import {
  Alert,
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Link as MuiLink,
  Typography,
  Divider,
} from '@mui/material';
import { StyledAuthButton, StyledFormCard, StyledTextField } from './styles';

export default function FirebaseLoginView() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Invalid credentials. Please try again.');
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledFormCard>
      <Typography textAlign='center' fontWeight='bold' variant='h4' mb={2}>
        Login
      </Typography>
      <Divider />
      <Box mt={2} component='form' onSubmit={handleSubmit}>
        <StyledTextField
          value={formData.email}
          type='email'
          id='email'
          onChange={handleChange}
          required
          fullWidth
          variant='outlined'
          label='Email'
          size='small'
          margin='normal'
        />
        <StyledTextField
          value={formData.password}
          type='password'
          id='password'
          onChange={handleChange}
          required
          fullWidth
          variant='outlined'
          label='Password'
          size='small'
          margin='normal'
        />
        {errorMessage && (
          <Alert severity='error' sx={{ mt: 2, mb: 1, fontWeight: '500' }}>
            {errorMessage}
          </Alert>
        )}
        <StyledAuthButton
          endIcon={<LoginIcon />}
          loading={isLoading}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </StyledAuthButton>
        <Typography variant='body2' align='center'>
          Don't have an account?{' '}
          <MuiLink
            sx={{ fontWeight: '600' }}
            component={Link}
            href='/register'
            underline='hover'
            color='secondary'
          >
            Register here
          </MuiLink>
        </Typography>
      </Box>
    </StyledFormCard>
  );
}
