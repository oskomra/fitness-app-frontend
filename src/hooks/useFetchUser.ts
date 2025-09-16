"use client";
import { useState, useEffect } from "react";
import { type User } from "@/types/types";

export default function useFetchUser(id: number | undefined | null) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setUser(null);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
        );
        if (!response.ok) {
          setUser(null);
          return;
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, [id]);
  return { user };
}
