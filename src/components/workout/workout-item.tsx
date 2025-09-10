"use client";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Card, CardContent } from "../ui/card";
import WorkoutExerciseItem from "./workout-exercise-item";
import { useRouter } from "next/navigation";

export default function WorkoutItem() {
  const workout = useAppSelector((state) => state.workout.workout);
  const router = useRouter();
  if (!workout) return null;

  return (
    <>
      {workout.exercises.length === 0 ? (
        <Card className="flex flex-col items-center w-full mt-4">
          <CardContent>Add exercises to this workout.</CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col items-center w-full mt-4">
          <CardContent>
            {workout?.exercises?.map((exercise) => (
              <WorkoutExerciseItem
                key={exercise.exerciseId}
                exerciseId={exercise.exerciseId}
                workoutExercise={exercise}
                onClick={() => {
                  router.push(`/exercise/${exercise.exerciseId}`);
                }}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
