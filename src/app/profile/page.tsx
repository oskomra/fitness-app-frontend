"use client";
import ProfileCard from "@/components/profile/profile-card";
import Workouts from "@/components/workout/workouts";
import useFetchWorkoutsCount from "@/hooks/useFetchWorkoutsCount";
import { useState, useRef } from "react";
import { useAuth } from "@/providers/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();
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
