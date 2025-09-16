"use client";
import useFetchUser from "@/hooks/useFetchUser";
import ProfileCard from "@/components/profile/profile-card";
import Workouts from "@/components/workout/workouts";
import useFetchWorkoutsCount from "@/hooks/useFetchWorkoutsCount";
import { useState, useRef, use } from "react";

type UserPageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default function UserPage({ params }: UserPageProps) {
  const { id } = use(params);
  const { user } = useFetchUser(id);
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsCount = useFetchWorkoutsCount(user?.id);
  const pageCount = Math.ceil((workoutsCount || 0) / 5);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col items-center justify-start min-h-screen py-2 gap-5"
    >
      <ProfileCard workoutsCount={workoutsCount} user={user} />
      <Workouts
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        scrollRef={scrollRef}
        user={user}
      />
    </div>
  );
}
