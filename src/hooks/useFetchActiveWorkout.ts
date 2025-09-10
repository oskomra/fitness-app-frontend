import { useState, useEffect } from "react";
import { type Workout } from "@/types/types";
import { useAppDispatch } from "./useAppDispatch";

export default function useFetchActiveWorkout() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveWorkout = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workouts/active`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "workout/setWorkout", payload: data });
          setError(null);
        }
      } catch (err: any) {
        setError(err.message);
        dispatch({ type: "workout/clearWorkout" });
      } finally {
        setLoading(false);
      }
    };
    fetchActiveWorkout();
  }, [dispatch]);
  return { loading, error };
}
