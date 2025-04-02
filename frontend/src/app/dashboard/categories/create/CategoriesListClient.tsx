"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import DashboardLayout from "@/components/Dashboard/Layout/DashboardLayout";
import { ToastContainer } from "react-toastify";
import CategoriesListComponent from "@/components/Dashboard/Categories/Forms/CategoriesListComponent";
import { ICategoryReturn } from "@/@types/category";

interface CategoriesListClientProps {
  categories: ICategoryReturn[];
}

const CategoriesListClient = ({ categories }: CategoriesListClientProps) => {
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
        <ToastContainer position="top-right" autoClose={1000} theme="dark" />
        <CategoriesListComponent categories={categories} />
      </DashboardLayout>
    </DashboardLayoutProvider>
  );
};

export default CategoriesListClient;
