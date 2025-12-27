"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth");
    if (!isAuth) {
      router.replace("/login");
    }
  }, []);

  return children;
}
