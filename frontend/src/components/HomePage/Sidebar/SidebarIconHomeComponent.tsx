import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface SidebarComponentIconHomeProps {
  open: boolean;
  handleToggleMenu: (value: boolean) => void;
}

const SidebarIconHomeComponent: React.FC<SidebarComponentIconHomeProps> = ({
  open,
  handleToggleMenu,
}) => {

  return (
    <IconButton onClick={() => handleToggleMenu(!open)}>
      {open ? (
        <MenuOpenIcon
          sx={{
            fontSize: "2rem",
            color: "var(--black)",
          }}
        />
      ) : (
        <MenuIcon
          sx={{
            fontSize: "2rem",
            color: "var(--black)",
          }}
        />
      )}
    </IconButton>
  );
};

export default SidebarIconHomeComponent;
