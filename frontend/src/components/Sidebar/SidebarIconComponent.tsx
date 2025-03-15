import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface SidebarComponentIconProps {
  open: boolean;
  handleToggleMenu: () => void;
}

const SidebarIconComponent: React.FC<SidebarComponentIconProps> = ({
  open,
  handleToggleMenu,
}) => {
  return (
    <IconButton onClick={handleToggleMenu}>
      {open ? (
        <MenuOpenIcon sx={{ fontSize: "2rem", color: "var(--primary)" }} />
      ) : (
        <MenuIcon sx={{ fontSize: "2rem", color: "var(--primary)" }} />
      )}
    </IconButton>
  );
};

export default SidebarIconComponent;
