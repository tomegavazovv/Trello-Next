import React from "react";
import styles from "./page.module.css";
import FirebaseLoginView from "@/sections/auth/firebase/firebase-login-view";

export default function Login() {
    return (
		<div className={styles.container}>
        <FirebaseLoginView />
    </div>
		);
}
