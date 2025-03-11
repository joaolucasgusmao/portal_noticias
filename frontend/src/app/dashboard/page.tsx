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

const DashboardPage: React.FC = () => {
  const isAuthenticated = auth();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openNews, setOpenNews] = useState<boolean>(false);
  const [openBanners, setOpenBanners] = useState<boolean>(false);
  const [openUsers, setOpenUsers] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <PropagateLoader color="var(--primary)" />
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between px-4 bg-[var(--background)] h-14 border-b-2 border-b-[var(--card-bg)]">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ color: "var(--primary)" }}
        >
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </header>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "var(--background)",
            color: "var(--primary)",
          },
        }}
      >
        <Box className="w-64 p-4 border-b-2 border-b-[var(--card-bg)]">
          <h2 className="text-lg font-bold text-[var(--primary)]">
            Portal de Notícias
          </h2>
        </Box>
        <Box className="w-64 px-4 py-3">
          <List>
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
              }}
            >
              <HomeRoundedIcon fontSize="small" />
              <ListItemText
                primary="Home"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                }}
              />
            </ListItem>

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
              }}
            >
              <ArticleRoundedIcon fontSize="small" />
              <ListItemText
                primary="Notícias"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                  },
                }}
              />
              {openNews ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openNews} timeout="auto" unmountOnExit>
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
                  }}
                >
                  <ListItemText
                    primary="Todas as notícias"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
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
                  }}
                >
                  <ListItemText
                    primary="Adicionar nova notícia"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
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
                  }}
                >
                  <ListItemText
                    primary="Categorias"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>

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
              }}
            >
              <ImageRoundedIcon fontSize="small" />
              <ListItemText
                primary="Banners"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                  },
                }}
              />
              {openBanners ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openBanners} timeout="auto" unmountOnExit>
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
                  }}
                >
                  <ListItemText
                    primary="Todos os banners"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
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
                  }}
                >
                  <ListItemText
                    primary="Adicionar novo banner"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>

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
              }}
            >
              <GroupRoundedIcon fontSize="small" />
              <ListItemText
                primary="Usuários"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                  },
                }}
              />
              {openUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openUsers} timeout="auto" unmountOnExit>
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
                  }}
                >
                  <ListItemText
                    primary="Todos os usuários"
                    sx={{
                      color: "var(--primary)",
                      cursor: "pointer",
                      gap: "0.5rem",
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
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
                  }}
                >
                  <ListItemText
                    primary="Adicionar novo usuário"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]"></main>
    </>
  );
};

export default DashboardPage;
