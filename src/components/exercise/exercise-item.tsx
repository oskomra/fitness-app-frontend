import ExerciseImage from "./exercise-image";
import { type Exercise } from "@/types/types";

type ExerciseItemProps = {
  exercise: Exercise;
  onClick: () => void;
};

export default function ExerciseItem({ exercise, onClick }: ExerciseItemProps) {
  return (
    <div
      className="flex flex-row items-center gap-2 p-2 cursor-pointer hoverable rounded-md"
      onClick={onClick}
    >
      <ExerciseImage
        gifUrl={exercise.gifUrl}
        exerciseId={exercise.exerciseId}
      />
      <div className="flex flex-col">
        <h3 className="text-sm">{exercise.name}</h3>
        <h4 className="text-sm text-neutral-400">
          {exercise.targetMuscles[0]?.name}
        </h4>
      </div>
    </div>
  );
}
