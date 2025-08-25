"use client";
import ExerciseItem from "./exercise-item";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Spinner } from "../ui/shadcn-io/spinner";
import { useRouter } from "next/navigation";

export default function AllExercises() {
  const filteredExercises = useAppSelector(
    (state) => state.exercises.filteredExercises
  );
  const isInitialized = useAppSelector(
    (state) => state.exercises.isInitialized
  );

  const router = useRouter();
  const isLoading = !isInitialized;

  const handleExerciseClick = (exerciseId: string) => {
    router.push(`/exercise/${exerciseId}`);
  };

  return (
    <ScrollArea className="h-128 w-full mt-4 border-t-2">
      <Label className="p-2 font-semibold dark:text-neutral-400 text-xl">
        All Exercises
      </Label>
      {isLoading ? (
        <div className="flex flex-row justify-center p-40">
          <Spinner />
        </div>
      ) : filteredExercises.length > 0 ? (
        filteredExercises.map((exercise) => (
          <ExerciseItem
            exercise={exercise}
            key={exercise.exerciseId}
            onClick={() => handleExerciseClick(exercise.exerciseId)}
          />
        ))
      ) : (
        <div className="p-4 text-center text-neutral-500">
          No exercises found for the selected filters
        </div>
      )}
    </ScrollArea>
  );
}
