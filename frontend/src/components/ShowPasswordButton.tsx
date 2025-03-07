import React from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ShowPasswordButtonProps {
  showPassword: boolean;
  onClick: () => void;
}

const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  showPassword,
  onClick,
}) => {
  return (
    <IconButton
      onClick={onClick}
      edge="end"
      aria-label="toggle password visibility"
    >
      {showPassword ? (
        <VisibilityOff sx={{ fontSize: "1.4rem" }} />
      ) : (
        <Visibility sx={{ fontSize: "1.4rem" }} />
      )}
    </IconButton>
  );
};

export default ShowPasswordButton;
