import { useGifPreview } from "@/hooks/useGifPreview";
import { type Exercise } from "@/types/types";

type ExerciseItemProps = {
  exercise: Exercise;
  onClick: () => void;
};

export default function ExerciseItem({ exercise, onClick }: ExerciseItemProps) {
  const preview = useGifPreview(exercise.gifUrl, exercise.exerciseId);

  return (
    <div
      className="flex flex-row items-center gap-2 p-2 cursor-pointer hoverable rounded-md"
      onClick={onClick}
    >
      <img
        src={preview || exercise.gifUrl}
        alt={exercise.name}
        className="w-12 h-12 rounded-full object-cover"
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
