"use client";
import { Input } from "../ui/input";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

export default function ExerciseSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch({ type: "exercises/filterExercises", payload: query });
    }, 100),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search exercises..."
        className="w-full"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
