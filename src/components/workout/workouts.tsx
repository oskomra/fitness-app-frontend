"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { User, type Workout } from "@/types/types";
import { Spinner } from "../ui/shadcn-io/spinner";
import WorkoutCard from "./workout-card";

type WorkoutCardProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  user: User | null;
};

export default function Workouts({
  currentPage,
  setCurrentPage,
  pageCount,
  scrollRef,
  user,
}: WorkoutCardProps) {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    const fetchAllUserWorkouts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workouts/${user?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: currentPage - 1, size: 5 }),
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setWorkouts(data);
      }
    };
    fetchAllUserWorkouts();
  }, [currentPage, user]);

  const handlePageChange = (page: number) => {
    setWorkouts(null);
    setCurrentPage(page);
  };

  return workouts === null ? (
    <div className="w-full md:w-full lg:w-4xl flex flex-col gap-2">
      <h2 className="text-lg font-semibold mb-2 ml-2">Recent Workouts</h2>
      <Card className="w-full md:w-full lg:w-xl mb-4">
        <CardContent className="flex justify-center items-center">
          <Spinner />
        </CardContent>
      </Card>
    </div>
  ) : (
    <>
      {workouts.length > 0 ? (
        <WorkoutCard
          workouts={workouts}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          pageCount={pageCount}
          scrollRef={scrollRef}
        />
      ) : (
        <div className="w-full md:w-full lg:w-4xl flex flex-col gap-2">
          <h2 className="text-lg font-semibold mb-2 ml-2">Recent Workouts</h2>
          <Card className="w-full md:w-full lg:w-xl mb-4">
            <CardContent className="flex justify-center items-center">
              <p className="text-sm text-neutral-400">No workouts found</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
