import { create } from "zustand";

const useProductsStore = create((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  cache: {},

  fetchProducts: async (limit, skip, search = "", category = "") => {
    const key = `${limit}-${skip}-${search}-${category}`;
    const cache = get().cache;

    if (cache[key]) {
      set({ products: cache[key].products, total: cache[key].total });
      return;
    }

    set({ loading: true });

    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    set((state) => ({
      products: data.products,
      total: data.total,
      loading: false,
      cache: {
        ...state.cache,
        [key]: { products: data.products, total: data.total },
      },
    }));
  },
}));

export default useProductsStore;
