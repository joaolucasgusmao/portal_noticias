import { Box } from "@mui/material";
import Image from "next/image";

interface UserMenuBoxProps {
  handleToggleUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  name?: string;
  email?: string;
  avatar?: string;
}

const UserMenuBox = ({
  handleToggleUserMenu,
  name,
  email,
  avatar,
}: UserMenuBoxProps) => {
  return (
    <Box
      className="flex items-center justify-center gap-2 relative cursor-pointer"
      onClick={handleToggleUserMenu}
    >
      <Image
        src={avatar ? avatar : "/user.png"}
        alt="Avatar"
        width={100}
        height={100}
        className="w-10 h-10 cursor-pointer rounded-full"
      />
      <Box className="hidden sm:flex flex-col justify-center">
        <p className="text-sm font-medium text-[var(--gray)]">{name}</p>
        <span className="text-xs font-medium text-[var(--gray)]">{email}</span>
      </Box>
    </Box>
  );
};

export default UserMenuBox;
