"use client";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        p: 4,
      }}
    >
      <Box
        maxWidth={600}
        mx="auto"
        mt={10}
        p={4}
        borderRadius={3}
        sx={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <Typography variant="h4" mb={2}>
          Welcome, {session.user.username} 👋
        </Typography>

        <Typography variant="body1" mb={3}>
          You are successfully logged in using DummyJSON authentication.
        </Typography>

        <Button
          variant="contained"
          onClick={async () => {
            await signOut({ redirect: false });
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
