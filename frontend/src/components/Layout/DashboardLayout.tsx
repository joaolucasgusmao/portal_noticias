"use client";

import { useDashboardLayout } from "@/context/DashboardLayoutContext";
import { useUser } from "@/context/UserContext";
import { useMediaQuery, useTheme, Box } from "@mui/material";
import HeaderComponent from "@/components/HeaderComponent";
import SidebarIconComponent from "@/components/Sidebar/SidebarIconComponent";
import UserMenuBoxComponent from "@/components/UserMenu/UserMenuBoxComponent";
import UserMenuComponent from "@/components/UserMenu/UserMenuComponent";
import SidebarComponent from "@/components/Sidebar/SidebarComponent";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useUser();
  const {
    open,
    openNews,
    openBanners,
    openUsers,
    openUserMenu,
    anchorEl,
    handleToggleMenu,
    handleToggleUserMenu,
    handleClose,
    handleLogout,
    setOpen,
    setOpenBanners,
    setOpenNews,
    setOpenUsers,
  } = useDashboardLayout();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          openUserMenu={openUserMenu}
          handleLogout={handleLogout}
        />
      </HeaderComponent>

      <SidebarComponent
        open={open}
        setOpen={setOpen}
        openBanners={openBanners}
        openNews={openNews}
        openUsers={openUsers}
        setOpenBanners={setOpenBanners}
        setOpenNews={setOpenNews}
        setOpenUsers={setOpenUsers}
        user={user}
      />

      <main
        className="min-h-screen w-full flex justify-center items-center bg-[var(--black)] pt-20 transition-all duration-300"
        style={{
          marginLeft: isMobile ? "0" : open ? "250px" : "60px",
          width: `calc(100% - ${isMobile ? "0px" : open ? "250px" : "60px"})`,
        }}
      >
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
