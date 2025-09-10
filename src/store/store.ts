import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./slices/exercises-slice";
import workoutReducer from "./slices/workout-slice";

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
    workout: workoutReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
