"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import Spinner from "@/components/spinner";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div><Spinner loading={loading} size={20} color="#000" /></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      {children}
    </div>
  );
}