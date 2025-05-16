import { ICategoryReturn } from "@/@types/category";
import { useDashboardLayoutHome } from "@/context/DashboardLayoutContextHome";
import {
  Drawer,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

interface SidebarHomeComponentProps {
  categories: ICategoryReturn[];
}

const SidebarHomeComponent = ({ categories }: SidebarHomeComponentProps) => {
  const { open, handleToggleMenu } = useDashboardLayoutHome();

  return (
    <Drawer
      variant="temporary"
      open={open}
      anchor="left"
      onClose={() => handleToggleMenu(false)}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: {
            xs: 280,
            sm: 300,
            md: 375,
          },
        },
      }}
    >
      <div className="flex justify-center mt-4">
        <h1 className="text-[var(--orange)] text-2xl font-bold">SUA LOGO</h1>
      </div>
      <nav aria-label="Categorias de notícias">
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                component={Link}
                href={`/category/${category.slug}`}
                sx={{
                  px: 2,
                  py: 1.8,
                  borderBottom: "1px solid var(--gray-2)",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "1rem",
                      color: "var(--black)",
                      fontWeight: "bold",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <div className="flex justify-center items-center gap-2 mt-8">
        <InstagramIcon
          sx={{
            color: "var(--black)",
            cursor: "pointer",
            fontSize: "1.7rem",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color: "var(--orange)",
              transform: "scale(1.1)",
            },
          }}
        />
        <YouTubeIcon
          sx={{
            color: "var(--black)",
            cursor: "pointer",
            fontSize: "1.7rem",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color: "var(--orange)",
              transform: "scale(1.1)",
            },
          }}
        />
        <FacebookIcon
          sx={{
            color: "var(--black)",
            cursor: "pointer",
            fontSize: "1.7rem",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color: "var(--orange)",
              transform: "scale(1.1)",
            },
          }}
        />
      </div>
    </Drawer>
  );
};

export default SidebarHomeComponent;
