"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setExercises,
  setFilteredExercises,
} from "@/store/slices/exercises-slice";
import { type Exercise } from "@/types/types";

type ExerciseStoreInitializerProps = {
  exercises: Exercise[];
};

export default function ExerciseStoreInitializer({
  exercises,
}: ExerciseStoreInitializerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setExercises(exercises));
    dispatch(setFilteredExercises(exercises));
  }, [dispatch, exercises]);

  return null;
}
