import React from 'react';

import { Task as TaskType } from '@/types/task';
import { Box, IconButton, Paper, styled, Typography } from '@mui/material';
import Clear from '@mui/icons-material/Clear';

type TaskProps = {
  initialTask: TaskType;
  onDelete: (id: string) => void;
  onUpdateTask: (task: TaskType) => void;
};

export default function Task({ initialTask, onDelete, onUpdateTask }: TaskProps) {
  const [task, setTask] = React.useState(initialTask);
  
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', task.id);
    e.dataTransfer.setData('fromColumn', task.columnId);
    e.currentTarget.style.opacity = '0.3';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    target.contentEditable = 'false';
    const updatedText = target.innerText.trim();

    if (updatedText === '') {
      setTask({
        ...task,
        text: task.text + ' ',
      });
      return;
    }

    const updatedTask = {
      ...task,
      text: updatedText.trim(),
    };

    setTask(updatedTask);
    onUpdateTask(updatedTask);
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    target.contentEditable = 'true';
    target.focus();
  };

  return (
    <TaskBox
    elevation={1}
      className='task'
      data-id={initialTask.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <TaskText onDoubleClick={handleDoubleClick} onBlur={handleBlur}>
        {task.text.trim()}
      </TaskText>
      <DeleteButtonWrapper>
        <IconButton onClick={handleDelete}>
          <Clear
            sx={{
              fontSize: '17px',
            }}
          />
        </IconButton>
      </DeleteButtonWrapper>
    </TaskBox>
  );
}

const TaskBox = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  background: 'white',
  padding: '10px',
  alignItems: 'center',
  position: 'relative',
}));

const TaskText = styled(Typography)(({ theme }) => ({
  flex: 1,
  wordBreak: 'break-word',
  paddingRight: '40px',
}));

const DeleteButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '5px',
  right: '5px',
});
