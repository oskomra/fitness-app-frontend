import { type Muscle } from "@/types/types";
import { useEffect, useState } from "react";

export default function useFetchMuscles() {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/muscles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const muscles = await response.json();
        setMuscles(muscles);
      } catch (error) {
        console.error("Error fetching muscles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMuscles();
  }, []);

  return { muscles, loading, error };
}
