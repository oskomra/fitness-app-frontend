"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import WorkoutItem from "./workout-item";
import { type Workout } from "@/types/types";
import { set } from "lodash";

export default function Workout() {
  const [isActive, setIsActive] = useState(false);
  const [workoutData, setWorkoutData] = useState<Workout | null>(null);

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
        setIsActive(true);
        setWorkoutData(data);
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
        const data = await response.json();
        setIsActive(false);
        setWorkoutData(null);
      }
    } catch (error) {
      console.error("Error ending workout:", error);
    }
  };

  return (
    <>
      <Card className="flex flex-col w-full">
        <CardContent className="flex flex-1 items-center justify-center">
          {isActive ? (
            <div className="flex flex-row items-center gap-4">
              <span>{workoutData?.startDate}</span>
              <Button onClick={handleEndWorkout}>End Workout</Button>
            </div>
          ) : (
            <Button onClick={handleStartWorkout}>Start Workout</Button>
          )}
        </CardContent>
      </Card>
      <WorkoutItem workout={workoutData} />
    </>
  );
}
