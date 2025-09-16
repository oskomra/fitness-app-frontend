"use client";
import useFetchExercise from "@/hooks/useFetchExercise";
import WorkoutExerciseSetItem from "./workout-exercise-set-item";
import { type WorkoutExercise } from "@/types/types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Button } from "@/components/ui/button";
import ExerciseImage from "../exercise/exercise-image";

type WorkoutExerciseItemProps = {
  exerciseId: string;
  onClick: () => void;
  onRemove: () => void;
  workoutExercise: WorkoutExercise;
};

export default function WorkoutExerciseItem({
  exerciseId,
  onClick,
  onRemove,
  workoutExercise,
}: WorkoutExerciseItemProps) {
  const { exercise } = useFetchExercise({ exerciseId });
  const dispatch = useAppDispatch();

  const handleAddSet = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workout-exercise-sets/${workoutExercise.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "workout/addWorkoutExerciseSet", payload: data });
      }
    } catch (error) {
      console.error("Error adding set:", error);
    }
  };

  const handleRemoveSet = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workout-exercise-sets/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        dispatch({ type: "workout/removeWorkoutExerciseSet", payload: id });
      }
    } catch (error) {
      console.error("Error removing set:", error);
    }
  };

  if (!exercise) return null;

  return (
    <>
      <div className="flex flex-row items-center lg:w-72 dark:bg-neutral-800 bg-neutral-200 rounded-md my-2">
        <div
          className="flex flex-row items-center gap-2 p-2 cursor-pointer hoverable rounded-md hover:bg-transparent"
          onClick={onClick}
        >
          <ExerciseImage
            gifUrl={exercise.gifUrl}
            exerciseId={exercise.exerciseId}
          />
          <div className="flex flex-col">
            <h3 className="text-sm">
              {exercise.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h3>
          </div>
        </div>
        <div className="flex justify-end flex-1">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-500 hover:text-red-700 mr-5 cursor-pointer"
            onClick={onRemove}
          />
        </div>
      </div>
      {workoutExercise.sets?.length === 0 ? (
        <div className="flex flex-col items-center text-sm text-neutral-400">
          No sets added yet.
        </div>
      ) : (
        <div className="flex flex-col items-center text-sm text-neutral-400 mb-2">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between w-full px-4 py-2">
              <p className="ml-3">Sets</p>
              <p className="">Weight</p>
              <p className="mr-7">Reps</p>
            </div>
            {workoutExercise.sets?.map((set) => (
              <WorkoutExerciseSetItem
                key={set.id}
                workoutExerciseSet={set}
                onRemove={() => handleRemoveSet(set.id)}
              />
            ))}
          </div>
          <Button
            className="mt-2 mb-4 w-full cursor-pointer"
            variant="secondary"
            onClick={handleAddSet}
          >
            Add Set
          </Button>
        </div>
      )}
    </>
  );
}
