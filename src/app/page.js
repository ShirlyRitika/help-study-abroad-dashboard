"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #141e30, #243b55)",
        color: "white",
      }}
    >
      <Typography variant="h3" mb={3}>
        Welcome to Auth Demo App
      </Typography>

      <Box>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>

        <Button variant="outlined" onClick={() => router.push("/register")}>
          Register
        </Button>
      </Box>
    </Box>
  );
}
