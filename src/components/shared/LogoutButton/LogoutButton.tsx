"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <button className={styles.logout} onClick={logout}>Logout</button>
}