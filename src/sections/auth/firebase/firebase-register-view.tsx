"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from './auth-form.module.css';
import { useAuth } from "@/auth/context/firebase/auth-provider";
import { validateEmail, validatePassword } from "./validators";

export default function FirebaseRegisterView() {
  const router = useRouter();
  const { register } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrorMessage(emailError || passwordError);
      return;
    }

    try {
      setIsLoading(true);
      await register(formData.email, formData.password);
      router.push("/");
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("Email already in use. Please use a different email.");
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input value={formData.email} type="email" id="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <input value={formData.password} type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <input value={formData.confirmPassword} type="password" id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? 'Submitting...' : 'Login'}</button>
        <p className={styles.alternateText}>Already have an account? <Link href="/login"><span className={styles.alternateLink}>Login here</span></Link></p>
      </form>
    </div>
  );
}