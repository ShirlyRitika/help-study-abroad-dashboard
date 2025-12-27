import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  
  login: async (username, password) => {
  try {
    set({ loading: true, error: null });

    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();

    set({
      user: data,
      token: data.token,
      loading: false,
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
    }
  } catch (err) {
    set({
      error: "Invalid credentials",
      loading: false,
    });
  }
},


  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
}));
