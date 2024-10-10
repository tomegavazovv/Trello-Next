import React from "react";
import styles from "./page.module.css";
import FirebaseRegisterView from "@/sections/auth/firebase/firebase-register-view";


export default function Register() {
    return (
        <div className={styles.container}>
            <FirebaseRegisterView />
        </div>
    );
}