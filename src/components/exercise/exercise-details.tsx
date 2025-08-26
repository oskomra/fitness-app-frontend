import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Equipment,
  type BodyPart,
  type TargetMuscle,
  type SecondaryMuscle,
} from "@/types/types";

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

export default function ExerciseDetails({
  exercise,
}: {
  exercise: ExerciseDetails;
}) {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {exercise.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 text-sm lg:text-md">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row mb-2">
              <span className="mr-2">Equipments:</span>
              <div className="flex flex-wrap gap-1">
                {exercise.equipments.map((equipment) => (
                  <span className="text-neutral-400" key={equipment.id}>
                    {equipment.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-row mb-2">
              <span className="mr-2">Target Muscles:</span>
              <div className="flex flex-wrap gap-1">
                {exercise.targetMuscles.map((muscle) => (
                  <span className="text-neutral-400" key={muscle.id}>
                    {muscle.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-row mb-2">
              <span className="mr-2">Secondary Muscles:</span>
              <div className="flex flex-wrap gap-1">
                {exercise.secondaryMuscles.map((muscle) => (
                  <span className="text-neutral-400" key={muscle.id}>
                    {muscle.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-row">
              <span className="mr-2">Body Parts:</span>
              <div className="flex flex-wrap gap-1">
                {exercise.bodyParts.map((muscle) => (
                  <span className="text-neutral-400" key={muscle.id}>
                    {muscle.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:flex flex flex-row justify-end md:w-1/3">
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div className="text-sm lg:text-md mt-4">
          <span className="font-semibold mb-4">Instructions:</span>
          {exercise.instructions.map((instruction, index) => (
            <div className="text-neutral-400 mt-2" key={index}>
              {instruction}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
