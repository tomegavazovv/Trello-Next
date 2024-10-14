'use client';

import React from 'react';

import { Column } from '../../../components/column';
import { Box, Grid2 as Grid } from '@mui/material';
import { ColumnSkeleton } from '@/components/column';
import { useColumnTasks } from '@/components/column/hooks/use-column-tasks';

export default function Board() {
  const { columnToTasks, isLoading } = useColumnTasks();

  const renderSkeleton = () => {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid sx={{ display: 'flex' }} key={index}>
            <ColumnSkeleton />
          </Grid>
        ))}
      </>
    );
  };

  const renderColumns = () => {
    return Object.keys(columnToTasks).map((columnId, index) => (
      <Grid sx={{ display: 'flex' }} key={columnId}>
        <Column
          id={columnId}
          title={columnToTasks[columnId].title}
          tasks={columnToTasks[columnId].tasks}
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
