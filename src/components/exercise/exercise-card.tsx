"use client";
import useFetchExercise from "@/hooks/useFetchExercise";
import ExerciseImage from "./exercise-image";
import { Spinner } from "../ui/shadcn-io/spinner";

export default function ExerciseCard({
  exerciseId,
  setNumber,
}: {
  exerciseId: string;
  setNumber: number;
}) {
  const { exercise } = useFetchExercise({ exerciseId });

  return exercise ? (
    <div className="flex flex-row items-center gap-4">
      <ExerciseImage gifUrl={exercise.gifUrl} exerciseId={exerciseId} />
      <div className="flex flex-col">
        <p className="text-sm">
          {setNumber} sets {exercise?.name}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-12">
      <Spinner />
    </div>
  );
}
