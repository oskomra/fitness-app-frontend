import { configureStore } from "@reduxjs/toolkit";
import exercisesReducer from "./slices/exercises-slice";

const store = configureStore({
  reducer: {
    exercises: exercisesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
