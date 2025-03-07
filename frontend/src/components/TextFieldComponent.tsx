import React from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";

type TextFieldComponentProps = TextFieldProps & {
  label: string;
};

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({
  label,
  ...props
}) => {
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
            borderColor: "var(--border)",
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
          color: "var(--text-secondary)",
          transition: "color 0.3s ease, transform 0.3s ease",
          fontSize: "1rem",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--primary)",
          fontSize: "1.3rem",
        },
        "& .MuiInputBase-input": {
          color: "var(--text-secondary)",
        },
      }}
    />
  );
};

export default TextFieldComponent;
