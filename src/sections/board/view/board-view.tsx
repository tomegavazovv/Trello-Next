'use client';

import React from 'react';

import { Column } from '../../../components/column';
import { useTasksContext } from '@/components/column/context';
import { Box, Grid2 as Grid } from '@mui/material';
import { ColumnSkeleton } from '@/components/column';

export default function Board() {
  const { columnToTasks, isLoading } = useTasksContext();

  const renderSkeleton = () => {
    return (
      <>
        <Grid sx={{ display: 'flex' }} key={1}>
          <ColumnSkeleton />
        </Grid>
        <Grid sx={{ display: 'flex' }} key={2}>
          <ColumnSkeleton />
        </Grid>
        <Grid sx={{ display: 'flex' }} key={3}>
          <ColumnSkeleton />
        </Grid>
        <Grid sx={{ display: 'flex' }} key={4}>
          <ColumnSkeleton />
        </Grid>
        <Grid sx={{ display: 'flex' }} key={5}>
          <ColumnSkeleton />
        </Grid>
      </>
    );
  };

  const renderColumns = () => {
    return Object.keys(columnToTasks).map((column, index) => (
      <Grid sx={{ display: 'flex' }} key={column}>
        <Column
          id={column}
          title={columnToTasks[column].title}
          tasks={columnToTasks[column].tasks}
          allowAddTask={index === 0}
        />
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} display={'flex'} justifyContent={'center'}>
        {isLoading ? renderSkeleton() : renderColumns()}
      </Grid>
    </Box>
  );
}
