import {
  type Equipment,
  type BodyPart,
  type TargetMuscle,
  type SecondaryMuscle,
} from "@/types/types";
import ExerciseDetails from "@/components/exercise/exercise-details";

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

  return <ExerciseDetails exercise={exercise} />;
}
