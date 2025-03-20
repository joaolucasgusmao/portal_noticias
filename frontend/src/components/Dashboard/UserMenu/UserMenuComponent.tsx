import { Menu, MenuItem } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import Link from "next/link";

interface UserMenuComponentProps {
  anchorEl: null | HTMLElement;
  openUserMenu: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

const UserMenuComponent: React.FC<UserMenuComponentProps> = ({
  anchorEl,
  openUserMenu,
  handleClose,
  handleLogout,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={openUserMenu}
      onClose={handleClose}
      PaperProps={{
        sx: {
          backgroundColor: "var(--black-2)",
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
            backgroundColor: "var(--black-3)",
            transform: "scale(1.02)",
          },
          "&:active": {
            backgroundColor: "var(--black-3)",
            transform: "scale(0.98)",
          },
        }}
      >
        <AccountCircleRoundedIcon className="text-[var(--primary)]" />
        <Link href="#" className="text-sm font-medium text-[var(--primary)]">
          Perfil
        </Link>
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        className="flex items-center gap-2"
        sx={{
          color: "var(--primary)",
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
        }}
      >
        <LogoutRounded className="text-[var(--primary)]" />
        <a className="text-sm font-medium text-[var(--primary)]">Sair</a>
      </MenuItem>
    </Menu>
  );
};

export default UserMenuComponent;
