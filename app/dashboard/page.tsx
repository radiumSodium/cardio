"use client";

import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { dbUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && dbUser) {
      if (dbUser.role === "admin") {
        router.push("/dashboard/admin");
      } else if (dbUser.role === "caretaker") {
        router.push("/dashboard/caretaker");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [dbUser, loading, router]);

  return <div className="text-center pt-20 text-white">Redirecting to your dashboard...</div>;
}
