import Spinner from "@/components/spinner";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
    height={'95vh'}
    width='100vw'
    display={'flex'}
    justifyContent='center'
    alignItems='center'
    >
      <Spinner size={50}/>
    </Box>
  );
}