import React from "react";
import styles from "./page.module.css";
import RegisterForm from "@/components/auth/AuthForm/RegisterForm/RegisterForm";


export default function Register() {
    return (
        <div className={styles.container}>
            <RegisterForm />
        </div>
    );
}