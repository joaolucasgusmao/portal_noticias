import React from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";

type InputComponentProps = TextFieldProps & {
  label: string;
};

const InputComponent: React.FC<InputComponentProps> = ({ label, ...props }) => {
  return (
    <MUITextField
      label={label}
      variant="outlined"
      fullWidth
      {...props}
      sx={{
        mb: 2,
        backgroundColor: "var(--input-bg)",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "var(--input-border)",
            transition: "border-color 0.3s ease",
          },
          "&:hover fieldset": {
            borderColor: "var(--primary-hover)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--primary)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--gray)",
          transition: "color 0.3s ease, transform 0.3s ease",
          fontSize: "1rem",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--primary)",
          fontSize: "1.3rem",
        },
        "& .MuiInputBase-input": {
          color: "var(--gray)",
        },
      }}
    />
  );
};

export default InputComponent;
