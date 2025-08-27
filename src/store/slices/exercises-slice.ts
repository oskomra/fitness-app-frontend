import { createSlice } from "@reduxjs/toolkit";
import { type Exercise } from "@/types/types";

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [] as Exercise[],
    filteredExercises: [] as Exercise[],
    isInitialized: false,
  },
  reducers: {
    setExercises: (state, action) => {
      state.exercises = action.payload;
      state.isInitialized = true;
    },
    setFilteredExercises: (state, action) => {
      state.filteredExercises = action.payload;
      state.isInitialized = true;
    },
    filterExercises: (state, action) => {
      const query = action.payload.toLowerCase();

      if (query === "") {
        state.filteredExercises = state.exercises;
      } else {
        state.filteredExercises = state.exercises.filter((exercise) =>
          exercise.name.toLowerCase().includes(query)
        );
      }
    },
  },
});

export const { setExercises, setFilteredExercises } = exercisesSlice.actions;
export default exercisesSlice.reducer;
