import React from "react";
import TextFieldComponent from "./TextFieldComponent";
import ButtonComponent from "./ButtonComponent";
import ShowPasswordButton from "./ShowPasswordButton";

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
    <div>
      <TextFieldComponent
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextFieldComponent
        label="Senha"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <ShowPasswordButton
              showPassword={showPassword}
              onClick={handleClickShowPassword}
            />
          ),
        }}
      />
      <ButtonComponent label="Entrar" onClick={handleLogin} fullWidth />
    </div>
  );
};

export default LoginForm;
