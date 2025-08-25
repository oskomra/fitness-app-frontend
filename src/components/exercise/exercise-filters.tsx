"use client";
import { type TargetMuscle, type Equipment, Exercise } from "@/types/types";
import SelectButton from "../ui/select-button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setFilteredExercises } from "@/store/slices/exercises-slice";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

type ExerciseFiltersProps = {
  targetMuscles: TargetMuscle[];
  equipments: Equipment[];
};

export default function ExerciseFilters({
  targetMuscles,
  equipments,
}: ExerciseFiltersProps) {
  const dispatch = useAppDispatch();
  const exercises = useAppSelector((state) => state.exercises.exercises);
  const [selectedEquipment, setSelectedEquipment] = useState<string>("all");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("all");

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (selectedEquipment !== "all") {
      filtered = filtered.filter(
        (exercise) => exercise.equipments[0]?.name === selectedEquipment
      );
    }

    if (selectedMuscle !== "all") {
      filtered = filtered.filter(
        (exercise) => exercise.targetMuscles[0]?.name === selectedMuscle
      );
    }

    return filtered;
  }, [exercises, selectedEquipment, selectedMuscle]);

  useEffect(() => {
    dispatch(setFilteredExercises(filteredExercises));
  }, [dispatch, filteredExercises]);

  return (
    <>
      <SelectButton
        selectedElement={selectedEquipment}
        setSelectedElement={setSelectedEquipment}
        elements={equipments}
        type="equipments"
      />
      <SelectButton
        selectedElement={selectedMuscle}
        setSelectedElement={setSelectedMuscle}
        elements={targetMuscles}
        type="muscles"
      />
    </>
  );
}
