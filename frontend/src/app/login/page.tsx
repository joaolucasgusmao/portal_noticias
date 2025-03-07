"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userLogin from "@/hooks/userLogin";

const LoginPage: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    handleLogin,
    handleClickShowPassword,
  } = userLogin();

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
          width: { xs: "100%", sm: "500px" },
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
          sx={{ color: "var(--primary)", fontSize: "1.125rem" }}
        >
          Login
        </Typography>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleLogin={handleLogin}
        />
      </Paper>
    </Box>
  );
};

export default LoginPage;
