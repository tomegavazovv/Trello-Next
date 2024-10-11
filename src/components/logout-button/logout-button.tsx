"use client";

import { useAuthContext } from "@/auth/hooks/use-auth-context";
import Logout from '@mui/icons-material/Logout'
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { logout } = useAuthContext();
  return <Button endIcon={<Logout/>} variant="contained" onClick={logout}>Logout</Button>
}