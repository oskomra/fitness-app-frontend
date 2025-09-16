"use client";
import { Card, CardContent } from "@/components/ui/card";
import transformDate from "@/lib/transformDate";
import workoutDuration from "@/lib/workoutDuration";
import workoutVolume from "@/lib/workoutVolume";
import ExerciseCard from "../exercise/exercise-card";
import WorkoutPagination from "./workout-pagination";
import { type Workout } from "@/types/types";

type WorkoutCardProps = {
  workouts: Workout[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  pageCount: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export default function WorkoutCard({
  workouts,
  currentPage,
  handlePageChange,
  pageCount,
  scrollRef,
}: WorkoutCardProps) {
  return (
    <div className="w-full md:w-full lg:w-4xl flex flex-col gap-2">
      <h2 className="text-lg font-semibold mb-2 ml-2">Recent Workouts</h2>
      {workouts.map((workout) => (
        <Card key={workout.id} className="w-full md:w-full lg:w-xl mb-4">
          <CardContent>
            <div className="flex flex-col gap-4 border-b border-b-neutral-400 pb-4">
              <div className="flex flex-row gap-2 items-center">
                <img
                  src="/user.webp"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-xs font-semibold">
                    {workout.user.name} {workout.user.lastName}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {transformDate(workout.endDate)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">{workout.title}</p>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-xs text-neutral-400">Duration</p>
                  <p className="text-xs font-semibold">
                    {workout.endDate !== null &&
                      workoutDuration(workout.startDate, workout.endDate)}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs text-neutral-400">Volume</span>
                  <span className="text-xs font-semibold">
                    {workoutVolume(workout)} kg
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-sm text-neutral-400 ">Exercises</h3>
              {workout.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exerciseId={exercise.exerciseId}
                  setNumber={exercise.sets.length}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <WorkoutPagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        pageCount={pageCount}
        scrollRef={scrollRef}
      />
    </div>
  );
}
