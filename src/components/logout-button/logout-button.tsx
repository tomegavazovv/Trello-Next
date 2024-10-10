"use client";

import styles from "./logout-button.module.css";
import { useAuthContext } from "@/auth/hooks/use-auth-context";

export default function LogoutButton() {
  const { logout } = useAuthContext();
  return <button className={styles.logout} onClick={logout}>Logout</button>
}