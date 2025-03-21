"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import DashboardLayout from "@/components/Dashboard/Layout/DashboardLayout";
import ListNewsComponent from "@/components/Dashboard/News/ListNewsComponent";
import { INewsReturn } from "@/@types/news";

interface NewsListClientProps {
  news: INewsReturn[];
}

const NewsListClient = ({ news }: NewsListClientProps) => {
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
        <ListNewsComponent news={news} />
      </DashboardLayout>
    </DashboardLayoutProvider>
  );
};

export default NewsListClient;
