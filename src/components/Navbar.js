"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const isAuth = status === "authenticated";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          Auth Demo
        </Typography>

        {!isAuth ? (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        ) : (
          <>
            <Typography sx={{ mr: 2 }}>
              Hi, {session?.user?.username || session?.user?.firstName || "User"}
            </Typography>

            <Button color="inherit" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>

            <Button color="inherit" onClick={() => router.push("/users")}>
              Users
            </Button>

            <Button color="inherit" onClick={() => router.push("/products")}>
              Products
            </Button>

            <Button color="inherit" onClick={() => router.push("/profile")}>
              Profile
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
