import { type Exercise } from "@/types/types";

export default async function getExercises() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercises`);
  const data = await res.json();

  return data.map((exercise: Exercise) => ({
    ...exercise,
    name: exercise.name
      .split(" ")
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" "),
  }));
}
