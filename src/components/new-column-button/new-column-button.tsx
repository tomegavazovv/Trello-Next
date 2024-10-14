'use client';

import { useState } from 'react';
import Modal from '../modal/modal';
import { Box, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useMutateColumnTasks } from '../column/hooks/use-mutate-column-tasks';

export default function AddColumnButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const {addColumn} = useMutateColumnTasks();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsOpen(false);
    setNewColumnTitle('');
    addColumn.mutate(newColumnTitle);
  };

  if (isOpen) {
    return (
      <Modal onClose={() => setIsOpen(false)}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          width={'300px'}
          alignItems={'center'}
          component='form'
          onSubmit={handleSubmit}
        >
          <TextField
            size='small'
            value={newColumnTitle}
            fullWidth
            type='text'
            label={<Box sx={{ fontSize: '12px' }}>New Column Name</Box>}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            
          />
          <Button
            variant='contained'
            fullWidth
            type='submit'
            disabled={!newColumnTitle}
          >
            Add Column
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Button
      endIcon={<Add />}
      color='secondary'
      variant='contained'
      onClick={handleClick}
    >
      Add Column
    </Button>
  );
}
