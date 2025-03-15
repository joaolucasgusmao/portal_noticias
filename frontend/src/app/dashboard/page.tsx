"use client";

import { auth } from "@/lib/auth";
import { Box } from "@mui/material";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useUser } from "@/context/UserContext";
import logout from "@/lib/logout";
import HeaderComponent from "@/components/HeaderComponent";
import SidebarIconComponent from "@/components/Sidebar/SidebarIconComponent";
import UserMenuBoxComponent from "@/components/UserMenu/UserMenuBoxComponent";
import UserMenuComponent from "@/components/UserMenu/UserMenuComponent";
import SidebarComponent from "@/components/Sidebar/SidebarComponent";

const DashboardPage: React.FC = () => {
  const isAuthenticated = auth();
  const { user } = useUser();

  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [openNews, setOpenNews] = useState<boolean>(false);
  const [openBanners, setOpenBanners] = useState<boolean>(false);
  const [openUsers, setOpenUsers] = useState<boolean>(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleToggleMenu = () => {
    setOpen((prev) => {
      const newOpen = !prev;
      if (!newOpen) {
        setOpenNews(false);
        setOpenBanners(false);
        setOpenUsers(false);
      }
      return newOpen;
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

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--black)]">
        <PropagateLoader color="var(--primary)" />
      </div>
    );
  }

  return (
    <>
      <HeaderComponent>
        <Box className="flex items-center gap-4">
          <SidebarIconComponent
            open={open}
            handleToggleMenu={handleToggleMenu}
          />
          <h1 className="text-[var(--primary)] text-xl font-bold">Sua Logo</h1>
        </Box>
        <UserMenuBoxComponent
          handleToggleUserMenu={handleToggleUserMenu}
          avatar={user?.avatar}
          email={user?.email}
          name={user?.name}
        />

        <UserMenuComponent
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogout={handleLogout}
          openUserMenu={openUserMenu}
        />
      </HeaderComponent>

      <SidebarComponent
        open={open}
        openBanners={openBanners}
        openNews={openNews}
        openUsers={openUsers}
        setOpen={setOpen}
        setOpenBanners={setOpenBanners}
        setOpenNews={setOpenNews}
        setOpenUsers={setOpenUsers}
        user={user}
      />

      <main className="min-h-screen flex items-center justify-center bg-[var(--black)] pt-14"></main>
    </>
  );
};

export default DashboardPage;
