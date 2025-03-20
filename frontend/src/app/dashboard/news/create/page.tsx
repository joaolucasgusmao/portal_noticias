"use client";

import CreateNewsComponentForm from "@/components/Dashboard/Forms/CreateNewsComponentForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import DashboardLayout from "@/components/Dashboard/Layout/DashboardLayout";
import { ToastContainer } from "react-toastify";

const NewsForm: React.FC = () => {
  const isAuthenticated = auth();
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
      <DashboardLayout useSidebar={false}>
        <ToastContainer position="top-right" autoClose={1000} theme="dark" />
        <CreateNewsComponentForm />
      </DashboardLayout>
    </DashboardLayoutProvider>
  );
};

export default NewsForm;
