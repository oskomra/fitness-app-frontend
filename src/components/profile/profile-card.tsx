"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@/types/types";

export default function ProfileCard({
  workoutsCount,
  user,
}: {
  workoutsCount: number | 0;
  user: User | null;
}) {
  return user === null ? (
    <Card className="w-full md:w-full lg:w-4xl">
      <CardContent className="flex items-center gap-5">
        <Skeleton className="w-32 h-32 rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </CardContent>
    </Card>
  ) : (
    <Card className="w-full md:w-full lg:w-4xl">
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <img
            src="/user.webp"
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
          <div className="flex flex-col gap-4">
            <p className="text-md font-semibold">
              {user?.name} {user?.lastName}
            </p>
            <div className="flex flex-row gap-5">
              <div className="flex gap-2">
                <p className="text-sm text-neutral-400">Workouts</p>
                <span className="text-sm">{workoutsCount || 0}</span>
              </div>
              <div className="flex gap-2">
                <p className="text-sm text-neutral-400">Followers</p>
                <span className="text-sm">0</span>
              </div>
              <div className="flex gap-2">
                <p className="text-sm text-neutral-400">Following</p>
                <span className="text-sm">0</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
