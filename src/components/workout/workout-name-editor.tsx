"use client";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState, useRef } from "react";

type WorkoutNameEditorProps = {
  title: string;
  description: string;
};

export default function WorkoutNameEditor({
  title,
  description,
}: WorkoutNameEditorProps) {
  const [workoutUpdate, setWorkoutUpdate] = useState({
    title: title ?? "",
    description: description ?? "",
  });
  const lastUpdatedRef = useRef({
    title: title,
    description: description,
  });
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title" && value.trim() === "") {
      setTitleError("Title cannot be empty");
      return;
    } else if (name === "description" && value.trim() === "") {
      setDescriptionError("Description cannot be empty");
      return;
    } else {
      setTitleError(null);
      setDescriptionError(null);
    }
    setWorkoutUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = async () => {
    if (
      lastUpdatedRef.current.title === workoutUpdate.title &&
      lastUpdatedRef.current.description === workoutUpdate.description
    ) {
      return;
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts/active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutUpdate),
        credentials: "include",
      });
      lastUpdatedRef.current = workoutUpdate;
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <>
      <Card className="flex flex-col w-full mt-4">
        <CardContent>
          <div className="flex flex-row gap-5 items-center justify-between w-full">
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              value={workoutUpdate.title ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
            />
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              value={workoutUpdate.description ?? ""}
              onChange={handleChange}
              onBlur={handleBlur}
              name="description"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
