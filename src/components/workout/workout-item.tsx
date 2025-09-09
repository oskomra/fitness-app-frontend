import { Card, CardContent } from "../ui/card";
import { type Workout } from "@/types/types";

export default function WorkoutItem({ workout }: { workout: Workout | null }) {
  if (!workout) return null;

  return (
    <>
      {workout.exercises.length === 0 ? (
        <Card className="flex flex-col items-center w-full mt-4">
          <CardContent>Add exercises to this workout.</CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col items-center w-full mt-4">
          <CardContent>
            <h3>{workout.startDate}</h3>
            {workout.exercises.map((exercise) => (
              <div key={exercise.exerciseId} className="mb-4">
                <h4 className="text-lg font-semibold">{exercise.exerciseId}</h4>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
