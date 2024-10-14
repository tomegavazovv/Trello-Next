import React, { useMemo, useState } from 'react';
import { TaskInput, Task as TaskType } from '../../types/task';
import Task from '../task/task';
import AddTask from './add-task-form';
import { getNearestElementByMouseY } from '@/utils/dom/getNearestElementByMouseY';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { reorderTasks } from '@/utils/task-utils';
import { useMutateColumnTasks } from './hooks/use-mutate-column-tasks';
import Modal from '../modal/modal';

type ColumnProps = {
  id: string;
  title: string;
  tasks: TaskType[];
  allowAddTask: boolean;
};

const Column = ({ id, title, tasks, allowAddTask }: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    addTaskToColumn,
    deleteTaskFromColumn,
    updateTasksOrderOfColumn,
    moveTaskToColumn,
    deleteColumn,
    updateTask,
  } = useMutateColumnTasks();

  const handleAddTask = (taskText: string) => {
    const newTask: TaskInput = {
      text: taskText,
      columnId: id,
      order: Math.max(...tasks.map((t: TaskType) => t.order), 0) + 1,
    };
    addTaskToColumn.mutate(newTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskFromColumn.mutate({ taskId, columnId: id });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedTaskId = e.dataTransfer.getData('id');
    const fromColumnId = e.dataTransfer.getData('fromColumn');
    const toColumnId = id;

    if (fromColumnId !== toColumnId) {
      moveTaskToColumn.mutate({
        taskId: droppedTaskId,
        toColumnId,
        fromColumnId,
      });
    } else {
      let targetTaskId: string | null = null;

      const targetTask = e.target as HTMLElement;
      const targetTaskElement = targetTask.closest('.task') as HTMLDivElement;
      if (targetTaskElement) {
        targetTaskId = targetTaskElement.dataset.id ?? null;
      } else {
        const mouseY = e.clientY;
        const columnElement = e.currentTarget as HTMLElement;
        targetTaskId = getNearestElementByMouseY('.task', mouseY, columnElement).getAttribute(
          'data-id'
        );
      }
      if (targetTaskId && targetTaskId !== droppedTaskId) {
        const updatedColumnTasks = reorderTasks(
          tasks,
          droppedTaskId,
          targetTaskId
        );
        updateTasksOrderOfColumn.mutate({ updatedColumnTasks, columnId: id });
      }
    }
  };

  const handleDeleteColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteColumn.mutate(id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUpdateTask = (task: TaskType) => {
    updateTask.mutate(task);
  };

  const renderModal = () => {
    return (
      <Modal onClose={() => setIsModalOpen(false)}>
        <Box component={'form'} onSubmit={handleDeleteColumn} width={'350px'}>
          <Stack spacing={1}>
            <Typography
              variant='body1'
              textAlign={'center'}
              lineHeight={'20px'}
            >
              Are you sure that you want to delete the column with title{' '}
              <strong>{title}</strong>?
            </Typography>
            <Button type='submit' variant='contained' fullWidth size='medium'>
              Delete Column
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  };

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
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems='center'
        mb={2}
      >
        <Typography variant='h5' fontWeight={'600'}>
          {title}
        </Typography>
        <IconButton color='primary' onClick={toggleModal}>
          <Delete
            sx={{
              fontSize: '20px',
            }}
          />
        </IconButton>
      </Box>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            initialTask={task}
            onDelete={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
        ))}
      </Stack>

      {allowAddTask && (
        <Box mt={2}>
          <AddTask onAddTask={handleAddTask} />
        </Box>
      )}
      {isModalOpen && renderModal()}
    </Paper>
  );
};

export default React.memo(Column, (prevProps, nextProps) => {
  return (
    prevProps.tasks.length === nextProps.tasks.length &&
    prevProps.tasks.every(
      (task, index) => task.id === nextProps.tasks[index].id
    )
  );
});
