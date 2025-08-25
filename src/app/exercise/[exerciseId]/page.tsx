import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Equipment,
  type BodyPart,
  type TargetMuscle,
  type SecondaryMuscle,
} from "@/types/types";

type ExerciseProps = {
  params: Promise<{
    exerciseId: string;
  }>;
};

type ExerciseDetails = {
  id: string;
  name: string;
  gifUrl: string;
  instructions: string[];
  bodyParts: BodyPart[];
  equipments: Equipment[];
  targetMuscles: TargetMuscle[];
  secondaryMuscles: SecondaryMuscle[];
};

export default async function Exercise({ params }: ExerciseProps) {
  const { exerciseId } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exercises/${exerciseId}`
  );
  const exercise: ExerciseDetails = await response.json();

  return (
    <>
      <h1 className="text-2xl font-semibold p-2 mb-2">Exercise</h1>
      <Card className="flex flex-col h-[calc(100vh-250px)]">
        <CardHeader>
          <CardTitle>{exercise.name}</CardTitle>
        </CardHeader>
        <CardContent className="">
          <img src={exercise.gifUrl} alt={exercise.name} />
          <h2 className="text-xl font-semibold mt-4">Instructions</h2>
          <ol className="list-decimal list-inside">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <h2 className="text-xl font-semibold mt-4">Target Muscles</h2>
          <ul className="list-disc list-inside">
            {exercise.targetMuscles.map((muscle) => (
              <li key={muscle.id}>{muscle.name}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Secondary Muscles</h2>
          <ul className="list-disc list-inside">
            {exercise.secondaryMuscles.map((muscle) => (
              <li key={muscle.id}>{muscle.name}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Body Parts</h2>
          <ul className="list-disc list-inside">
            {exercise.bodyParts.map((part) => (
              <li key={part.id}>{part.name}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Equipments</h2>
          <ul className="list-disc list-inside">
            {exercise.equipments.map((equipment) => (
              <li key={equipment.id}>{equipment.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
