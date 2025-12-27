"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const { isAuthenticated, hydrate } = useAuthStore();

  const [user, setUser] = useState(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser);
  }, [id]);

  if (!user) {
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

  return (
    <Box p={3}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
        <Typography>Address: {user.address?.city}</Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push("/users")}
        >
          Back to Users
        </Button>
      </Paper>
    </Box>
  );
}
