import React from 'react';
import { Box, Paper, Skeleton, Stack } from '@mui/material';

function ColumnSkeleton() {
  return (
    <Paper
      elevation={1}
      square={false}
      sx={{
        backgroundColor: '#f3f3f3',
        minWidth: '300px',
        maxWidth: '300px',
        padding: '16px',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems='center'
        mb={2}
      >
        <Skeleton variant='text' width={120} height={32} />
        <Skeleton variant='circular' width={24} height={24} />
      </Box>
      <Stack spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} variant='rectangular' height={40} />
        ))}
      </Stack>
      <Box mt={2}>
        <Skeleton variant='rectangular' height={40} />
      </Box>
    </Paper>
  );
}

export default ColumnSkeleton;
