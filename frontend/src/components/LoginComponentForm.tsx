import React from "react";
import { Box } from "@mui/material";
import ButtonComponent from "./commons/ButtonComponent";
import EyeIconComponent from "./commons/EyeIconComponent";
import InputComponent from "./commons/InputComponent";

interface LoginFormComponentProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleLogin: () => void;
  handleClickShowPassword: () => void;
}

const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  handleLogin,
  handleClickShowPassword,
}) => {
  return (
    <Box>
      <InputComponent
        label="E-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <InputComponent
        label="Senha"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        InputProps={{
          endAdornment: (
            <EyeIconComponent
              showPassword={showPassword}
              onClick={handleClickShowPassword}
            />
          ),
        }}
      />
      <ButtonComponent label="Entrar" onClick={handleLogin} fullWidth />
    </Box>
  );
};

export default LoginFormComponent;
