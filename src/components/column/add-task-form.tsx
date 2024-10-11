import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type AddTaskProps = {
  addTask: (task: string) => void;
}

export default function AddTask({ addTask }: AddTaskProps) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    addTask(taskText);
    setTaskText('');
  }

  return (
    <Box component='form' onSubmit={handleSubmit} display={'flex'} gap={1}>
      <TextField
        multiline
        fullWidth
        placeholder="Add a task"
        value={taskText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskText(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        sx={{
          backgroundColor: 'white',
          '& .MuiOutlinedInput-root':{
            '& fieldset': {
              borderColor: 'rgba(0,0,0,0.3)'
            }
          }
        }}
      />
      <Button size='small' variant="contained" disabled={!taskText} type="submit" sx={{
        minWidth: 'auto',
        whiteSpace: 'nowrap',
        height: 'fit-content',
        mt: '2px'
      }}>Add</Button>
    </Box>
  );
}