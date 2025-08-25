import AllExercises from "./all-exercises";
import ExerciseFilters from "./exercise-filters";
import getExercises from "@/lib/getExercises";
import getEquipments from "@/lib/getEquipments";
import getTargetMuscles from "@/lib/getTargetMuscles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExerciseStoreInitializer from "./exercise-store-initializer";
import { Spinner, type SpinnerProps } from "@/components/ui/shadcn-io/spinner";

export default async function ExerciseLibrary() {
  const exercises = await getExercises();
  const equipments = await getEquipments();
  const targetMuscles = await getTargetMuscles();

  return (
    <>
      <ExerciseStoreInitializer exercises={exercises} />
      <Card className="flex flex-col p-0">
        <CardHeader>
          <CardTitle className="text-2xl mt-4">Library</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex flex-col gap-2">
            <div className="mr-4 ml-4">
              <ExerciseFilters
                targetMuscles={targetMuscles}
                equipments={equipments}
              />
            </div>
            <AllExercises />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
