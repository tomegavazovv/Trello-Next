'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import { validateEmail, validatePassword } from './validators';
import { StyledAuthButton, StyledAuthCard, StyledTextField } from './styles';
import { Alert, Box, Divider, Typography, Link as MuiLink, InputAdornment, IconButton } from '@mui/material';
import { EmailOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

export default function FirebaseRegisterView() {
  const router = useRouter();
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrorMessage(emailError || passwordError);
      return;
    }

    try {
      setIsLoading(true);
      await register(formData.email, formData.password);
      router.push('/');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use. Please use a different email.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledAuthCard>
      <Typography textAlign='center' fontWeight='bold' variant='h4' mb={2}>
        Register
      </Typography>
      <Divider />

      <Box mt={2} component='form' onSubmit={handleSubmit}>
        <StyledTextField
          value={formData.email}
          type='email'
          id='email'
          onChange={handleChange}
          required
          variant='outlined'
          label='Email'
          size='small'
          margin='normal'
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <EmailOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
        <StyledTextField
          value={formData.password}
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          id='password'
          required
          variant='outlined'
          label='Password'
          size='small'
          margin='normal'
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end' >
                  <IconButton sx={{ p: 0, m: 0 }} onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? (
                      <VisibilityOutlined />
                  ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <StyledTextField
          value={formData.confirmPassword}
          type={showPassword ? 'text' : 'password'}
          id='confirmPassword'
          required
          onChange={handleChange}
          variant='outlined'
          label='Confirm Password'
          size='small'
          margin='normal'
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end' >
                  <IconButton sx={{ p: 0, m: 0 }} onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {errorMessage && (
          <Alert severity='error' sx={{ mt: 2, mb: 1, fontWeight: '500' }}>
            {errorMessage}
          </Alert>
        )}

       <StyledAuthButton
          loading={isLoading}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Register
        </StyledAuthButton>
        <Typography variant='body2' align='center'>
          Already have an account?{' '}
          <MuiLink
            sx={{ fontWeight: '600' }}
            component={Link}
            href='/login'
            underline='hover'
            color='secondary'
          >
            Login here
          </MuiLink>
        </Typography>
      </Box>
    </StyledAuthCard>
  );
}
