import React from "react";
import Input from "./commons/Input";
import Button from "./commons/Button";
import EyeIcon from "./commons/EyeIcon";
import { Box } from "@mui/material";

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleLogin: () => void;
  handleClickShowPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
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
      <Input
        label="E-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Senha"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        InputProps={{
          endAdornment: (
            <EyeIcon
              showPassword={showPassword}
              onClick={handleClickShowPassword}
            />
          ),
        }}
      />
      <Button label="Entrar" onClick={handleLogin} fullWidth />
    </Box>
  );
};

export default LoginForm;
