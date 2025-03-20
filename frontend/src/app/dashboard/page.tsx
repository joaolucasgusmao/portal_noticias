"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import DashboardLayout from "@/components/Dashboard/Layout/DashboardLayout";

const DashboardPage: React.FC = () => {
  const isAuthenticated = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--black)]">
        <PropagateLoader color="var(--primary)" />
      </div>
    );
  }

  return (
    <DashboardLayoutProvider>
      <DashboardLayout useSidebar={true}>
        <p className="text-[var(--primary)] font-bold text-2xl ml-8">
          Oops! Estamos em desenvolvimento.
        </p>
      </DashboardLayout>
    </DashboardLayoutProvider>
  );
};

export default DashboardPage;
