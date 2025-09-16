"use client";
import { useState, useEffect } from "react";

export default function useFetchWorkoutsCount(id: number | undefined) {
  const [workoutsCount, setWorkoutsCount] = useState(0);

  useEffect(() => {
    if (!id) {
      setWorkoutsCount(0);
      return;
    }
    const fetchWorkoutsCount = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workouts/count/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const text = await res.text();
      if (!text) {
        setWorkoutsCount(0);
        return;
      }
      try {
        const data = JSON.parse(text);
        setWorkoutsCount(data.count || 0);
      } catch {
        setWorkoutsCount(0);
      }
    };
    fetchWorkoutsCount();
  }, [id]);

  return workoutsCount || 0;
}
