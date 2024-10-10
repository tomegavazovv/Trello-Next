"use client";

import { FirebaseContextType } from "@/auth/types";
import { createContext } from "react";

export const AuthContext = createContext<FirebaseContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  loading: false,
});