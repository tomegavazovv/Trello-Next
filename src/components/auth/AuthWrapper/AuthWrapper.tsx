"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import Spinner from "@/components/helpers/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Spinner loading={loading} size={20} color="#000" />;
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