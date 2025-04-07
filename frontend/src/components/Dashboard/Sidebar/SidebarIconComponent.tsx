import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface SidebarComponentIconProps {
  open: boolean;
  homePage: boolean;
  handleToggleMenu: () => void;
}

const SidebarIconComponent: React.FC<SidebarComponentIconProps> = ({
  open,
  handleToggleMenu,
  homePage,
}) => {
  return (
    <IconButton onClick={handleToggleMenu}>
      {open ? (
        <MenuOpenIcon
          sx={{
            fontSize: "2rem",
            color: homePage ? "var(--black)" : "var(--primary)",
          }}
        />
      ) : (
        <MenuIcon
          sx={{
            fontSize: "2rem",
            color: homePage ? "var(--black)" : "var(--primary)",
          }}
        />
      )}
    </IconButton>
  );
};

export default SidebarIconComponent;
