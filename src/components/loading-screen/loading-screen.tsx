import { Box } from "@mui/material"
import Spinner from "../spinner";

export default function LoadingScreen() {
  return (
    <Box sx={{
      width: '100%',
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Spinner
        speedMultiplier={1}
        size={40}
        color='#000'
      />
    </Box>
  );
}