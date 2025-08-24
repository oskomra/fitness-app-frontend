"use client";
import React, { useState, useMemo } from "react";
import ExerciseItem from "./exercise-item";
import useFetchExercises from "@/hooks/useFetchExercises";
import useFetchEquipments from "@/hooks/useFetchEquipments";
import useFetchMuscles from "@/hooks/useFetchMuscles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectButton from "./ui/select-button";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";

export default function ExerciseLibrary() {
  const { exercises, loading, error } = useFetchExercises();
  const { equipments } = useFetchEquipments();
  const { muscles } = useFetchMuscles();
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

  if (error) return <div>Error fetching exercises</div>;

  return (
    <Card className="flex flex-col p-0">
      <CardHeader>
        <CardTitle className="text-2xl mt-4">Library</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex flex-col gap-2">
          <div className="mr-4 ml-4">
            <SelectButton
              selectedElement={selectedEquipment}
              setSelectedElement={setSelectedEquipment}
              elements={equipments}
              type="equipments"
            />
            <SelectButton
              selectedElement={selectedMuscle}
              setSelectedElement={setSelectedMuscle}
              elements={muscles}
              type="muscles"
            />
          </div>
          <ScrollArea className="h-128 w-full mt-4 border-t-2">
            <Label className="p-2 font-semibold dark:text-neutral-400 text-xl">
              All Exercises
            </Label>
            {!loading ? (
              filteredExercises.length > 0 ? (
                filteredExercises.map((exercise) => (
                  <ExerciseItem exercise={exercise} key={exercise.exerciseId} />
                ))
              ) : (
                <div className="p-4 text-center text-neutral-500">
                  No exercises found for the selected filters
                </div>
              )
            ) : (
              <div className="p-4 text-center">Loading...</div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
