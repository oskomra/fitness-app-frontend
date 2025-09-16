import { type Workout } from "@/types/types";

export default function workoutVolume(workout: Workout) {
  const totalVolume = workout.exercises.reduce((total, exercise) => {
    const exerciseVolume = exercise.sets.reduce((setTotal, set) => {
      return setTotal + set.reps * set.weight;
    }, 0);
    return total + exerciseVolume;
  }, 0);
  return totalVolume;
}
