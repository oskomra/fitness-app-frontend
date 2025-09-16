import { WorkoutExerciseSet } from "@/types/types";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type WorkoutExerciseSetItemProps = {
  workoutExerciseSet: WorkoutExerciseSet;
  onRemove: () => void;
};

export default function WorkoutExerciseSetItem({
  workoutExerciseSet,
  onRemove,
}: WorkoutExerciseSetItemProps) {
  const [exerciseSetUpdate, setExerciseSetUpdate] = useState({
    weight: workoutExerciseSet.weight,
    reps: workoutExerciseSet.reps,
  });
  const lastUpdatedRef = useRef({
    weight: workoutExerciseSet.weight,
    reps: workoutExerciseSet.reps,
  });
  const [weightError, setWeightError] = useState<string | null>(null);
  const [repsError, setRepsError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "weight" && isNaN(Number(value))) {
      setWeightError("Please enter a valid number");
      return;
    } else if (name === "reps" && isNaN(Number(value))) {
      setRepsError("Please enter a valid number");
      return;
    } else {
      setWeightError(null);
      setRepsError(null);
    }
    setExerciseSetUpdate((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleBlur = async () => {
    if (
      lastUpdatedRef.current.weight === exerciseSetUpdate.weight &&
      lastUpdatedRef.current.reps === exerciseSetUpdate.reps
    ) {
      return;
    }
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workout-exercise-sets/${workoutExerciseSet.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exerciseSetUpdate),
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Error updating exercise set:", error);
    }
    lastUpdatedRef.current = { ...exerciseSetUpdate };
  };

  return (
    <div className="flex flex-col items-center w-full mb-2 ">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row justify-between w-full px-4 py-2">
          <div className="w-12 h-8 text-center rounded-md border border-neutral-500 flex items-center justify-center">
            {workoutExerciseSet.setNumber}
          </div>
          <Input
            className="w-12 h-8 text-center"
            name="weight"
            value={exerciseSetUpdate.weight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            className="w-12 h-8 text-center"
            name="reps"
            value={exerciseSetUpdate.reps}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-row justify-end ">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onRemove}
            className="cursor-pointer text-red-500 hover:text-red-700"
          />
        </div>
      </div>
      {weightError && <div className="text-red-500 text-sm">{weightError}</div>}
      {repsError && <div className="text-red-500 text-sm">{repsError}</div>}
    </div>
  );
}
