import React from "react";
import LoginForm from "@/components/auth/AuthForm/LoginForm/LoginForm";
import styles from "./page.module.css";

export default function Login() {
    return (
		<div className={styles.container}>
        <LoginForm />
    </div>
		);
}
