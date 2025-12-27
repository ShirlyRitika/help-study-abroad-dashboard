"use client";

import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Protect route
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
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ background: "linear-gradient(135deg, #141e30, #243b55)" }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
          Profile
        </Typography>

        <Typography mb={1}>
          Name: {session.user.firstName} {session.user.lastName}
        </Typography>

        <Typography mb={2}>
          Email: {session.user.email}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
