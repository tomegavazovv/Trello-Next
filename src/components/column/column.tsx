import React, { ReactSVGElement, useState } from 'react';
import { Task as TaskType } from '../../types/task';
import Task from '../task/task';
import AddTask from './add-task-form';
import { getNearestElementByMouseY } from '@/utils/dom/getNearestElementByMouseY';
import { taskService } from '@/service/taskService';
import Modal from '@/components/modal/modal';
import { useAuthContext } from '@/auth/hooks/use-auth-context';
import { useTasksContext } from './context';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

type ColumnProps = {
  id: string;
  title: string;
  tasks: TaskType[];
  allowAddTask: boolean;
};

function Column({ id, title, tasks, allowAddTask }: ColumnProps) {
  const { addTask, deleteTask, reorderTasks, moveTaskToColumn, deleteColumn } =
    useTasksContext();
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (taskText: string) => {
    const newTask = addTask(id, taskText);
    taskService.addTask(user!.uid, newTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(id, taskId);
    taskService.deleteTaskFromColumn(taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedTaskId = e.dataTransfer.getData('id');
    const fromColumn = e.dataTransfer.getData('fromColumn');
    const toColumn = id;

    if (fromColumn !== toColumn) {
      const task = moveTaskToColumn(fromColumn, toColumn, droppedTaskId);
      taskService.moveTaskToColumn(droppedTaskId, toColumn, task.order);
    } else {
      let targetTaskId: string | null = null;

      const targetTask = e.target as HTMLElement;
      const targetTaskElement = targetTask.closest('.task') as HTMLDivElement;
      if (targetTaskElement) {
        targetTaskId = targetTaskElement.dataset.id ?? null;
      } else {
        const mouseY = e.clientY;
        targetTaskId = getNearestElementByMouseY('.task', mouseY).getAttribute(
          'data-id'
        );
      }

      if (targetTaskId && targetTaskId !== droppedTaskId) {
        const updatedTasks = reorderTasks(id, droppedTaskId, targetTaskId);
        taskService.updateTasksOrder(updatedTasks[id].tasks);
      }
    }
  };

  const handleDeleteColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    taskService.deleteColumn(user!.uid, id);
    deleteColumn(id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          <Delete sx={{
            fontSize: '20px'
          }}/>
        </IconButton>
      </Box>
      <Stack spacing={2}>
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <Task
              key={task.id}
              initialTask={task}
              onDelete={handleDeleteTask}
            />
          ))}
      </Stack>

      {allowAddTask && <Box mt={2}><AddTask addTask={handleAddTask} /></Box>}
      {isModalOpen && renderModal()}
    </Paper>
  );
}

export default React.memo(Column);
