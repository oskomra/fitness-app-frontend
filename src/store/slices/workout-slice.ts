import { createSlice } from "@reduxjs/toolkit";
import { type Workout } from "@/types/types";
import { remove } from "lodash";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workout: null as Workout | null,
    isActive: false,
  },
  reducers: {
    setWorkout: (state, action) => {
      state.workout = action.payload;
      state.isActive = true;
    },
    clearWorkout: (state) => {
      state.workout = null;
      state.isActive = false;
    },
    addWorkoutExercise: (state, action) => {
      if (!state.workout) return;
      state.workout.exercises.push(action.payload);
    },
    removeWorkoutExercise: (state, action) => {
      if (!state.workout || !state.workout.exercises) return;
      state.workout.exercises = state.workout.exercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    addWorkoutExerciseSet: (state, action) => {
      if (!state.workout || !state.workout.exercises) return;
      state.workout.exercises = state.workout.exercises.map((exercise) => {
        if (exercise.id === action.payload.workoutExerciseId) {
          return { ...exercise, sets: [...exercise.sets, action.payload] };
        }
        return exercise;
      });
    },
    removeWorkoutExerciseSet: (state, action) => {
      if (!state.workout || !state.workout.exercises) return;
      state.workout.exercises = state.workout.exercises.map((exercise) => {
        if (exercise.sets.some((set) => set.id === action.payload)) {
          return {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== action.payload),
          };
        }
        return exercise;
      });
    },
  },
});

export const {
  setWorkout,
  clearWorkout,
  addWorkoutExercise,
  removeWorkoutExercise,
} = workoutSlice.actions;

export default workoutSlice.reducer;
