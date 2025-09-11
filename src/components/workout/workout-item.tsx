"use client";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Card, CardContent } from "../ui/card";
import WorkoutExerciseItem from "./workout-exercise-item";
import { useRouter } from "next/navigation";

export default function WorkoutItem() {
  const workout = useAppSelector((state) => state.workout.workout);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRemoveWorkoutExercise = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workout-exercises/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        dispatch({ type: "workout/removeWorkoutExercise", payload: id });
      }
    } catch (error) {
      console.error("Error removing exercise:", error);
    }
  };

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
            {workout.exercises.map((exercise) => (
              <WorkoutExerciseItem
                key={exercise.exerciseId}
                exerciseId={exercise.exerciseId}
                workoutExercise={exercise}
                onClick={() => {
                  router.push(`/exercise/${exercise.exerciseId}`);
                }}
                onRemove={() => handleRemoveWorkoutExercise(exercise.id)}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
