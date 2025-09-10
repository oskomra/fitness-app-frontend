import { useGifPreview } from "@/hooks/useGifPreview";
import useFetchExercise from "@/hooks/useFetchExercise";
import WorkoutExerciseSetItem from "./workout-exercise-set-item";
import { type WorkoutExercise } from "@/types/types";

type WorkoutExerciseItemProps = {
  exerciseId: string;
  onClick: () => void;
  workoutExercise: WorkoutExercise;
};

export default function WorkoutExerciseItem({
  exerciseId,
  onClick,
  workoutExercise,
}: WorkoutExerciseItemProps) {
  const { exercise } = useFetchExercise({ exerciseId });
  const preview = useGifPreview(exercise?.gifUrl, exerciseId);

  if (!exercise) return null;

  return (
    <>
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
        </div>
      </div>
      {workoutExercise.sets.length === 0 ? (
        <div className="flex flex-col items-center text-sm text-neutral-400">
          No sets added yet.
        </div>
      ) : (
        <div className="flex flex-col items-center text-sm text-neutral-400">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between w-full px-4 py-2">
              <p>Set</p>
              <p>Weight</p>
              <p>Reps</p>
            </div>
            {workoutExercise.sets.map((set) => (
              <WorkoutExerciseSetItem key={set.id} workoutExerciseSet={set} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
