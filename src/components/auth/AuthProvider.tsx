"use client";

import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import React from "react";

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
      try{
        await signInWithEmailAndPassword(auth, email, password);
      }catch(error){
        console.error(error);
        throw error;
      }
    }

    const logout = async () => {
        try{
          await signOut(auth);
        }catch(error){
          console.error(error);
          throw error;
        }
    }

    const register = async (email: string, password: string) => {
      try{
        await createUserWithEmailAndPassword(auth, email, password);
      }catch(error){
        console.error(error);
        throw error;
      }
    }

    return (
      <AuthContext.Provider value={{ user, login, logout, register, loading }}>
        {children}
      </AuthContext.Provider>
    )
    
}

export const useAuth = () => React.useContext(AuthContext);