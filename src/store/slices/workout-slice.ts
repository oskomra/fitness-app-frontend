import { createSlice } from "@reduxjs/toolkit";
import { type Workout } from "@/types/types";

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
    setWorkoutExercise: (state, action) => {
      if (!state.workout) return;
      if (!state.workout.exercises) state.workout.exercises = [];
      state.workout.exercises.push(action.payload);
    },
    removeWorkoutExercise: (state, action) => {
      if (!state.workout || !state.workout.exercises) return;
      state.workout.exercises = state.workout.exercises.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    clearWorkout: (state) => {
      state.workout = null;
      state.isActive = false;
    },
  },
});

export const { setWorkout, clearWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
