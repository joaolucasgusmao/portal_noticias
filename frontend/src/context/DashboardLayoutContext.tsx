"use client";

import logout from "@/lib/logout";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface DashboardLayoutContextType {
  open: boolean;
  openNews: boolean;
  openBanners: boolean;
  openUsers: boolean;
  openUserMenu: boolean;
  anchorEl: HTMLElement | null;
  setOpen: (value: boolean) => void;
  setOpenNews: (value: boolean) => void;
  setOpenBanners: (value: boolean) => void;
  setOpenUsers: (value: boolean) => void;
  setOpenUserMenu: (value: boolean) => void;
  setAnchorEl: (element: HTMLElement | null) => void;
  handleToggleMenu: () => void;
  handleToggleUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleLogout: () => void;
}

const DashboardLayoutContext = createContext<
  DashboardLayoutContextType | undefined
>(undefined);

export const DashboardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const [open, setOpen] = useState<boolean>(!isMobile);
  const [openNews, setOpenNews] = useState<boolean>(false);
  const [openBanners, setOpenBanners] = useState<boolean>(false);
  const [openUsers, setOpenUsers] = useState<boolean>(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => {
    setOpen((prev) => {
      if (prev) {
        setOpenNews(false);
        setOpenBanners(false);
        setOpenUsers(false);
      }
      return !prev;
    });
  };

  const handleToggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenUserMenu((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <DashboardLayoutContext.Provider
      value={{
        open,
        openNews,
        openBanners,
        openUsers,
        openUserMenu,
        anchorEl,
        setOpen,
        setOpenNews,
        setOpenBanners,
        setOpenUsers,
        setOpenUserMenu,
        setAnchorEl,
        handleToggleMenu,
        handleToggleUserMenu,
        handleClose,
        handleLogout,
      }}
    >
      {children}
    </DashboardLayoutContext.Provider>
  );
};

export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error(
      "useDashboardLayout must be used within a DashboardLayoutProvider"
    );
  }
  return context;
};