import { WorkoutExerciseSet } from "@/types/types";
import { Input } from "@/components/ui/input";

type WorkoutExerciseSetItemProps = {
  workoutExerciseSet: WorkoutExerciseSet;
};

export default function WorkoutExerciseSetItem({
  workoutExerciseSet,
}: WorkoutExerciseSetItemProps) {
  return (
    <div className="flex flex-row justify-between w-full px-4 py-2">
      <div className="w-12 h-8 text-center rounded-md border border-neutral-500 flex items-center justify-center">
        {workoutExerciseSet.setNumber}
      </div>
      <Input
        className="w-12 h-8 text-center"
        value={workoutExerciseSet.weight}
      />
      <Input className="w-12 h-8 text-center" value={workoutExerciseSet.reps} />
    </div>
  );
}
