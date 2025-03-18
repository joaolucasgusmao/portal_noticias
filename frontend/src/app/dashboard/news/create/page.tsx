"use client";

import CreateNewsComponentForm from "@/components/CreateNewsComponentForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import DashboardLayout from "@/components/Layout/DashboardLayout";

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
      <DashboardLayout>
        <p className="text-[var(--primary)] font-bold text-2xl ml-8">
          <CreateNewsComponentForm />
        </p>
      </DashboardLayout>
    </DashboardLayoutProvider>
  );
};

export default NewsForm;
