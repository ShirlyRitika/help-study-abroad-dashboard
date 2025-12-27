"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useProductsStore from "@/store/useProductsStore";

export default function ProductsPage() {
  const router = useRouter();
  const { products, total, loading, fetchProducts } = useProductsStore();
  const { data: session, status } = useSession();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchProducts(limit, (page - 1) * limit, search, category);
  }, [page, search, category, fetchProducts]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

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
        Products
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search"
          value={search}
          onChange={handleSearch}
          fullWidth
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={handleCategory}
          sx={{ width: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="smartphones">Smartphones</MenuItem>
          <MenuItem value="laptops">Laptops</MenuItem>
          <MenuItem value="fragrances">Fragrances</MenuItem>
          <MenuItem value="skincare">Skincare</MenuItem>
          <MenuItem value="groceries">Groceries</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.thumbnail}
                  alt={product.title}
                />

                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography>₹{product.price}</Typography>
                  <Typography variant="body2">
                    {product.category}
                  </Typography>
                  <Typography variant="body2">
                    ⭐ {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
}
