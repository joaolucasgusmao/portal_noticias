"use client";

import { createContext, useContext, useState } from "react";

interface DashboardLayoutContextHomeType {
  open: boolean;
  handleToggleMenu: (value: boolean) => void;
}

const DashboardLayoutContextHome = createContext<
  DashboardLayoutContextHomeType | undefined
>(undefined);

export const DashboardLayoutProviderHome = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleMenu = (value: boolean) => {
    setOpen(value);
  };

  return (
    <DashboardLayoutContextHome.Provider
      value={{
        open,
        handleToggleMenu,
      }}
    >
      {children}
    </DashboardLayoutContextHome.Provider>
  );
};

export const useDashboardLayoutHome = () => {
  const context = useContext(DashboardLayoutContextHome);
  if (!context) {
    throw new Error(
      "useDashboardLayout must be used within a DashboardLayoutProvider"
    );
  }
  return context;
};
