import React from 'react';
import { Alert, Box } from '@mui/material';
import { createPortal } from 'react-dom';

export type AlertOptions = {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  duration?: number;
}

type AlertCardProps = {
  alert: AlertOptions;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const alertContent = (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: '90%',
        maxWidth: 400,
      }}
    >
      <Alert severity={alert.severity}>{alert.message}</Alert>
    </Box>
  );

  const alertRoot = document.getElementById('alert-root') || document.body;
  return createPortal(alertContent, alertRoot);
};