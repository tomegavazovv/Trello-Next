"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import Spinner from "@/components/shared/Spinner";

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>){
  return function WithAuth(props: P) {
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

    return <WrappedComponent {...props} />;
  };
}
