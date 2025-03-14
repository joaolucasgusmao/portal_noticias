"use client";

import { auth } from "@/lib/auth";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
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
import logout from "@/lib/logout";
import Header from "@/components/Header";
import SidebarIcon from "@/components/SidebarComponent/SidebarIcon";
import UserMenuBox from "@/components/UserMenuComponent/UserMenuBox";
import UserMenu from "@/components/UserMenuComponent/UserMenu";

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
      <Header>
        <Box className="flex items-center gap-4">
          <SidebarIcon open={open} handleToggleMenu={handleToggleMenu} />
          <h1 className="text-[var(--primary)] text-xl font-bold">Sua Logo</h1>
        </Box>
        <UserMenuBox
          handleToggleUserMenu={handleToggleUserMenu}
          avatar={user?.avatar}
          email={user?.email}
          name={user?.name}
        />

        <UserMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogout={handleLogout}
          openUserMenu={openUserMenu}
        />
      </Header>

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
            backgroundColor: "var(--black-2)",
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
                backgroundColor: "var(--black-3)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--black-3)",
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
                  padding: "0 !important",
                  margin: "0 !important",
                  "& .MuiTypography-root": {
                    padding: "0 !important",
                    margin: "0 !important",
                  },
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
                backgroundColor: "var(--black-3)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--black-3)",
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
                    padding: 0,
                    margin: 0,
                    "& .MuiTypography-root": {
                      padding: 0,
                      margin: 0,
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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
            {user?.is_admin ? (
              <ListItem
                component="button"
                sx={{
                  color: "var(--primary)",
                  cursor: "pointer",
                  gap: "0.5rem",
                  transition:
                    "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "var(--black-3)",
                    transform: "scale(1.02)",
                  },
                  "&:active": {
                    backgroundColor: "var(--black-3)",
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
            ) : null}
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
                backgroundColor: "var(--black-3)",
                transform: "scale(1.02)",
              },
              "&:active": {
                backgroundColor: "var(--black-3)",
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
                    padding: 0,
                    margin: 0,
                    "& .MuiTypography-root": {
                      padding: 0,
                      margin: 0,
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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
        {user?.is_admin ? (
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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
                      padding: 0,
                      margin: 0,
                      "& .MuiTypography-root": {
                        padding: 0,
                        margin: 0,
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
        ) : null}

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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
                  backgroundColor: "var(--black-3)",
                  transform: "scale(1.02)",
                },
                "&:active": {
                  backgroundColor: "var(--black-3)",
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
      <main className="min-h-screen flex items-center justify-center bg-[var(--black)] pt-14"></main>
    </>
  );
};

export default DashboardPage;
