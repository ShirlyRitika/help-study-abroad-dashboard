"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Pagination,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useUsersStore from "@/store/useUsersStore";

export default function UsersPage() {
  const router = useRouter();
  const { users, total, loading, fetchUsers } = useUsersStore();
  const { data: session, status } = useSession();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  // Protect route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch users
  useEffect(() => {
    fetchUsers(limit, (page - 1) * limit, search);
  }, [page, search, fetchUsers]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const totalPages = Math.ceil(total / limit);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Users
      </Typography>

      <TextField
        label="Search Users"
        value={search}
        onChange={handleSearch}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Paper>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => router.push(`/users/${user.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}
