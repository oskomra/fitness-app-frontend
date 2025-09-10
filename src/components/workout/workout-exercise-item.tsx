import { useGifPreview } from "@/hooks/useGifPreview";
import useFetchExercise from "@/hooks/useFetchExercise";

type WorkoutExerciseItemProps = {
  exerciseId: string;
  onClick: () => void;
};

export default function WorkoutExerciseItem({
  exerciseId,
  onClick,
}: WorkoutExerciseItemProps) {
  const { exercise } = useFetchExercise({ exerciseId });
  const preview = useGifPreview(exercise?.gifUrl, exerciseId);

  if (!exercise) return null;

  return (
    <div
      className="flex flex-row items-center gap-2 p-2 cursor-pointer hoverable rounded-md hover:bg-transparent"
      onClick={onClick}
    >
      <img
        src={preview || exercise?.gifUrl}
        alt={exercise?.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="text-sm">{exercise?.name}</h3>
        <h4 className="text-sm text-neutral-400">
          {exercise?.targetMuscles[0]?.name}
        </h4>
      </div>
    </div>
  );
}
