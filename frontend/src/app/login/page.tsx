"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.error(data.message);
      setError(data.message);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "var(--background)" }}
      p={2}
    >
      <ToastContainer position="top-right" autoClose={1000} theme="dark" />

      <Paper
        elevation={4}
        sx={{
          backgroundColor: "var(--card-bg)",
          width: { xs: "100%", sm: "400px" },
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={2}
          sx={{ color: "var(--primary)" }}
        >
          Acessar
        </Typography>

        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--primary)",
            },
          }}
          InputProps={{
            sx: {
              color: "var(--text-secondary)",
            },
          }}
        />

        <TextField
          label="Senha"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
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
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--primary)",
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? (
                  <Visibility sx={{ fontSize: "20px" }} />
                ) : (
                  <VisibilityOff sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            ),
            sx: {
              color: "var(--text-secondary)",
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            py: 1.2,
            backgroundColor: "var(--primary)",
            "&:hover": {
              backgroundColor: "var(--primary-hover)",
            },
          }}
        >
          Entrar
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
