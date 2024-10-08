import { auth } from "@/lib/firebaseConfig";
import { User } from "firebase/auth";

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}