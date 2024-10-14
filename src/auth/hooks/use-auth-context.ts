'use client';

import { useContext } from 'react';

import { AuthContext } from '../context/firebase/auth-context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};

export const useAuthenticatedUser = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error('User is not authenticated');
  return {user};
};
