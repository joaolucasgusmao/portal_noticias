import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

interface BtnProps extends ButtonProps {
  label: string;
}

const Button: React.FC<BtnProps> = ({ label, ...props }) => {
  return (
    <MUIButton
      variant="contained"
      color="primary"
      {...props}
      sx={{
        py: 1.2,
        backgroundColor: "var(--primary)",
        transition: "transform .5s",
        textTransform: "none",
        fontSize: "1rem",
        "&:hover": {
          backgroundColor: "var(--primary-hover)",
          transform: "scale(1.08)",
        },
      }}
    >
      {label}
    </MUIButton>
  );
};

export default Button;
