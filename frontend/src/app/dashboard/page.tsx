"use client";

import { auth } from "@/lib/auth";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function DashboardPage() {
  const isAuthenticated = auth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <PropagateLoader color="var(--primary)" />
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between px-4 bg-[var(--background)] h-14">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ color: "var(--primary)" }}
        >
          <MenuIcon />
        </IconButton>
      </header>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "var(--background)",
            color: "var(--primary)",
          },
        }}
      >
        <Box className="w-64 p-4">
          <h2 className="text-lg font-bold text-[var(--primary)]">Portal</h2>
          <List>
            <ListItem
              component="button"
              // onClick={() => router.push("/")}
              sx={{ color: "var(--primary)" }}
            >
              <ListItemText primary="Notícias" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
