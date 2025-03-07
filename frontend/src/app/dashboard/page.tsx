"use client";

import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function DashboardPage() {
  const isAuthenticated = auth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <PropagateLoader color="var(--primary)" />;
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <h1 className="text-[var(--primary)] text-2xl font-bold">
        Bem vindo ao Dashboard!
      </h1>
    </div>
  );
}
