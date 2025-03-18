import React from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface EyeIconComponentProps {
  showPassword: boolean;
  onClick: () => void;
}

const EyeIconComponent: React.FC<EyeIconComponentProps> = ({
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
        <VisibilityOff sx={{ fontSize: "1rem", color: "var(--gray)" }} />
      ) : (
        <Visibility sx={{ fontSize: "1rem", color: "var(--gray)" }} />
      )}
    </IconButton>
  );
};

export default EyeIconComponent;
