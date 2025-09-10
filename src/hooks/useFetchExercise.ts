"use client";
import { useState, useEffect, use } from "react";
import { type Exercise } from "@/types/types";

export default function useFetchExercise({
  exerciseId,
}: {
  exerciseId: string;
}) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercise = async (exerciseId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/exercises/${exerciseId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setExercise(data);
          setError(null);
        }
      } catch (error) {
        setError("Failed to fetch exercise");
      } finally {
        setLoading(false);
      }
    };

    fetchExercise(exerciseId);
  }, [exerciseId]);

  return { exercise, loading, error };
}
