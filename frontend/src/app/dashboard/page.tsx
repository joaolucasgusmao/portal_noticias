"use client";

import { auth } from "@/lib/auth";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { LogoutRounded } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const DashboardPage: React.FC = () => {
  const isAuthenticated = auth();
  const { user } = useUser();

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openNews, setOpenNews] = useState<boolean>(false);
  const [openBanners, setOpenBanners] = useState<boolean>(false);
  const [openUsers, setOpenUsers] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <PropagateLoader color="var(--primary)" />
      </div>
    );
  }

  return (
    <>
      <header className="top-0 w-full z-50 flex items-center justify-between px-4 bg-[var(--background)] h-14 border-b-2 border-b-[var(--card-bg)] fixed">
        <Box className="flex items-center gap-4">
          <IconButton
            onClick={handleToggleMenu}
            sx={{ color: "var(--primary)" }}
          >
            {open ? (
              <MenuOpenIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <MenuIcon sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
          <h1 className="text-[var(--primary)] text-xl font-bold">
            Portal de Notícias
          </h1>
        </Box>
        <Box
          className="flex items-center justify-center gap-2 relative cursor-pointer"
          onClick={handleOpenUserMenu}
        >
          <Image
            src={user?.avatar ?? "/user.png"}
            width={40}
            height={40}
            alt="Avatar"
            className="cursor-pointer rounded-full"
          />
          <Box className="hidden sm:flex flex-col justify-center">
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              {user?.name}
            </p>
            <span className="text-xs font-medium text-[var(--text-secondary)]">
              {user?.email}
            </span>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={openUserMenu}
          onClose={handleCloseUserMenu}
          PaperProps={{
            sx: {
              backgroundColor: "var(--background-2)",
              marginLeft: { xs: "1rem", sm: "0.8rem" },
              marginTop: "0.7rem",
              width: { xs: "8rem", sm: "9rem" },
            },
          }}
        >
          <MenuItem
            className="flex items-center gap-2"
            sx={{
              transition:
                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(0.98)",
              },
            }}
          >
            <AccountCircleRoundedIcon className="text-[var(--primary)]" />
            <Link
              href="#"
              className="text-sm font-medium text-[var(--primary)]"
            >
              Perfil
            </Link>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            className="flex items-center gap-2"
            sx={{
              transition:
                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(0.98)",
              },
            }}
          >
            <LogoutRounded className="text-[var(--primary)]" />
            <Link
              href="#"
              className="text-sm font-medium text-[var(--primary)]"
            >
              Sair
            </Link>
          </MenuItem>
        </Menu>
      </header>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? 250 : { xs: 0, sm: 60 },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 250 : { xs: 0, sm: 60 },
            transition: "width 0.3s",
            overflowX: "hidden",
            marginTop: "56px",
            height: "calc(100% - 56px)",
            backgroundColor: "var(--background-2)",
            color: "var(--primary)",
          },
        }}
      >
        <Tooltip title="" placement="right" disableHoverListener={open}>
          <ListItem
            component="button"
            sx={{
              color: "var(--primary)",
              cursor: "pointer",
              gap: "0.5rem",
              transition:
                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(0.98)",
              },
              marginTop: "0.7rem",
            }}
          >
            <HomeRoundedIcon onClick={() => setOpen(true)} />
            {open && (
              <ListItemText
                primary="Home"
                sx={{
                  marginLeft: 1,
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                    fontWeight: "700",
                  },
                }}
              />
            )}
          </ListItem>
        </Tooltip>

        <Tooltip title="" placement="right" disableHoverListener={open}>
          <ListItem
            component="button"
            onClick={() => setOpenNews(!openNews)}
            sx={{
              color: "var(--primary)",
              cursor: "pointer",
              gap: "0.5rem",
              transition:
                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(0.98)",
              },
              marginTop: "0.7rem",
            }}
          >
            <ArticleRoundedIcon onClick={() => setOpen(true)} />
            {open && (
              <>
                <ListItemText
                  primary="Notícias"
                  sx={{
                    padding: 0, // Remove o padding do ListItemText
                    margin: 0,
                    "& .MuiTypography-root": {
                      padding: 0, // Remove padding do Typography interno
                      margin: 0, // Remove margens caso existam
                    },
                    "& .MuiListItemText-primary": {
                      fontSize: "1rem",
                      fontWeight: "700",
                    },
                  }}
                />
                {openNews ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openNews && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Todas as notícias" />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Adicionar nova notícia" />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Categorias" />
            </ListItem>
          </List>
        </Collapse>
        <Tooltip title="" placement="right" disableHoverListener={open}>
          <ListItem
            component="button"
            onClick={() => setOpenBanners(!openBanners)}
            sx={{
              color: "var(--primary)",
              cursor: "pointer",
              gap: "0.5rem",
              transition:
                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(0.98)",
              },
              marginTop: "0.7rem",
            }}
          >
            <ImageRoundedIcon onClick={() => setOpen(true)} />
            {open && (
              <>
                <ListItemText
                  primary="Banners"
                  sx={{
                    padding: 0, // Remove o padding do ListItemText
                    margin: 0,
                    "& .MuiTypography-root": {
                      padding: 0, // Remove padding do Typography interno
                      margin: 0, // Remove margens caso existam
                    },
                    "& .MuiListItemText-primary": {
                      fontSize: "1rem",
                      fontWeight: "700",
                    },
                  }}
                />
                {openBanners ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openBanners && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Todos os banners" />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Adicionar novo banner" />
            </ListItem>
          </List>
        </Collapse>
        <Tooltip title="" placement="right" disableHoverListener={open}>
          <ListItem
            component="button"
            onClick={() => setOpenUsers(!openUsers)}
            sx={{
              color: "var(--primary)",
              cursor: "pointer",
              gap: "0.5rem",
              transition:
                "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--card-bg)",
                transform: "scale(0.98)",
              },
              marginTop: "0.7rem",
            }}
          >
            <GroupRoundedIcon onClick={() => setOpen(true)} />
            {open && (
              <>
                <ListItemText
                  primary="Usuários"
                  sx={{
                    padding: 0, // Remove o padding do ListItemText
                    margin: 0,
                    "& .MuiTypography-root": {
                      padding: 0, // Remove padding do Typography interno
                      margin: 0, // Remove margens caso existam
                    },
                    "& .MuiListItemText-primary": {
                      fontSize: "1rem",
                      fontWeight: "700",
                    },
                  }}
                />
                {openUsers ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItem>
        </Tooltip>
        <Collapse in={openUsers && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Todos os usuários" />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                color: "var(--primary)",
                cursor: "pointer",
                gap: "0.5rem",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--card-bg)",
                  transform: "scale(0.98)",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: "500",
                },
              }}
            >
              <ListItemText primary="Adicionar novo usuário" />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)] pt-14"></main>
    </>
  );
};

export default DashboardPage;
