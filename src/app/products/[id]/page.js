"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const { isAuthenticated, hydrate } = useAuthStore();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) {
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
      <Button onClick={() => router.push("/products")} sx={{ mb: 2 }}>
        ← Back to Products
      </Button>

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" mb={1}>
              {product.title}
            </Typography>

            <Typography variant="h6" mb={1}>
              ₹{product.price}
            </Typography>

            <Typography mb={1}>
              ⭐ {product.rating}
            </Typography>

            <Typography mb={2}>{product.description}</Typography>

            <Typography>
              Category: {product.category}
            </Typography>

            <Typography>
              Brand: {product.brand}
            </Typography>

            <Typography>
              Stock: {product.stock}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
