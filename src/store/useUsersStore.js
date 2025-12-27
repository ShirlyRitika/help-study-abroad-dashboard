import { create } from "zustand";

const useUsersStore = create((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  cache: {},

  fetchUsers: async (limit, skip, search = "") => {
    const key = `${limit}-${skip}-${search}`;
    const cache = get().cache;

    if (cache[key]) {
      set({ users: cache[key].users, total: cache[key].total });
      return;
    }

    set({ loading: true });

    const url = search
      ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    set((state) => ({
      users: data.users,
      total: data.total,
      loading: false,
      cache: {
        ...state.cache,
        [key]: { users: data.users, total: data.total },
      },
    }));
  },
}));

export default useUsersStore;
