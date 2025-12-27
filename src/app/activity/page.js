"use client";

import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function ActivityPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("activityLogs")) || [];
    setLogs(saved);
  }, []);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ background: "linear-gradient(135deg, #141e30, #243b55)" }}
    >
      <Paper sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" mb={2}>
          Activity Log
        </Typography>

        {logs.length === 0 ? (
          <Typography>No activity yet</Typography>
        ) : (
          logs.map((log, i) => (
            <Typography key={i}>
              {log.time} — {log.message}
            </Typography>
          ))
        )}
      </Paper>
    </Box>
  );
}
