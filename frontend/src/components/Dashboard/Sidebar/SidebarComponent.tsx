import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IUser } from "@/@types/user";
import { useRouter } from "next/navigation";

interface SidebarIconComponentProps {
  open: boolean;
  setOpen: (value: boolean) => void;

  openNews: boolean;
  setOpenNews: (value: boolean) => void;

  openBanners: boolean;
  setOpenBanners: (value: boolean) => void;

  openUsers: boolean;
  setOpenUsers: (value: boolean) => void;

  user: IUser | null;
}

const SidebarComponent = ({
  open,
  setOpen,
  setOpenNews,
  openNews,
  openBanners,
  setOpenBanners,
  setOpenUsers,
  openUsers,
  user,
}: SidebarIconComponentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={() => setOpen(false)}
      sx={{
        width: isMobile ? "auto" : open ? 250 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 250 : isMobile ? "auto" : 60,
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
          onClick={() => router.push("/dashboard")}
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
          <DashboardRoundedIcon onClick={() => setOpen(true)} />
          {open && (
            <ListItemText
              primary="Dashboard"
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
            onClick={() => router.push("/dashboard/news")}
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
            onClick={() => router.push("/dashboard/news/create")}
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
  );
};

export default SidebarComponent;
