"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useRouter } from "next/navigation";
import styles from '../AuthForm.module.css';
import Link from "next/link";

export default function LoginForm() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if(user) {
      router.push('/');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await login(formData.email, formData.password);
    } catch (error: any) {
      if(error.code === 'auth/invalid-credential') {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input value={formData.email} type="email" id="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <input value={formData.password} type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? 'Submitting...' : 'Login'}</button>
        <p className={styles.alternateText}>Don't have an account? <Link href="/register"><span className={styles.alternateLink}>Register here</span></Link></p>
      </form>
    </div>    
  );
}
