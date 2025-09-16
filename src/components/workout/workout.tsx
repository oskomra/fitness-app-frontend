"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import WorkoutItem from "./workout-item";
import { type Workout } from "@/types/types";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchActiveWorkout from "@/hooks/useFetchActiveWorkout";
import { Spinner } from "../ui/shadcn-io/spinner";
import { useState, useEffect } from "react";

export default function Workout() {
  const dispatch = useAppDispatch();
  const { loading } = useFetchActiveWorkout();
  const isActive = useAppSelector((state) => state.workout.isActive);
  const workout = useAppSelector((state) => state.workout.workout);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workout?.exercises && workout.exercises.length > 0) {
      setError(null);
    }
  }, [workout]);

  const handleStartWorkout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workouts/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "workout/setWorkout", payload: data });
      }
    } catch (error) {
      console.error("Error starting workout:", error);
    }
  };

  const handleEndWorkout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workouts/end`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        dispatch({ type: "workout/clearWorkout" });
      }
      if (response.status === 400) {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Error ending workout:", error);
    }
  };

  return loading ? (
    <Card className="flex flex-col w-full">
      <CardContent className="flex flex-1 items-center justify-center">
        <Spinner />
      </CardContent>
    </Card>
  ) : (
    <>
      <Card className="flex flex-col w-full">
        <CardContent className="flex flex-1 items-center justify-center">
          {isActive ? (
            <div className="flex flex-col items-center gap-4">
              <Button onClick={handleEndWorkout}>End Workout</Button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          ) : (
            <Button onClick={handleStartWorkout}>Start Workout</Button>
          )}
        </CardContent>
      </Card>
      <WorkoutItem />
    </>
  );
}
