"use client";

import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const isAuthenticated = auth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return <p>Verificando autenticação...</p>;
  }

  return <h1>Bem-vindo ao Dashboard</h1>;
}
