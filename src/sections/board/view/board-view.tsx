'use client';

import React from 'react';

import Column from '../../../components/column/column';
import { useTasksContext } from '@/components/column/context';
import { Box, Grid2 as Grid } from '@mui/material';
import LoadingScreen from '@/components/loading-screen';

export default function Board() {
  const { columnToTasks, isLoading } = useTasksContext();

  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={4} display={'flex'} justifyContent={'center'} >
      {Object.keys(columnToTasks).map((column, index) => (
        <Grid sx={{display: 'flex'}}>
          <Column
          id={column}
          title={columnToTasks[column].title}
          tasks={columnToTasks[column].tasks}
          allowAddTask={index === 0}
        />
        </Grid>
      ))}
      </Grid>
    </Box>
  );
}
