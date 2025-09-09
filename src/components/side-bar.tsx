"use client";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faUser,
  faGear,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./ui/shadcn-io/spinner";
import { useState, useEffect } from "react";

export default function SideBar() {
  const { user, logout } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-row h-20 w-full justify-center items-center md:flex-col md:w-64 md:h-screen md:justify-center md:items-center gap-2 p-4 ring-2 ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700 flex-shrink-0">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-row h-20 w-full justify-center items-center md:flex-col md:w-64 md:h-screen md:justify-start md:items-start gap-2 p-4 ring-2 ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700 flex-shrink-0">
      <div className="text-2xl font-semibold md:p-2 md:mb-5 md:w-full">
        <Link href="/" className="hover:bg-transparent">
          <FontAwesomeIcon className="md:mr-5" icon={faGrip} />
          <span className="hidden md:inline">Fitness App</span>
        </Link>
      </div>

      <Link href="/profile" className="rounded-sm p-2 md:w-full">
        <FontAwesomeIcon className="md:mr-2" icon={faUser} />
        <span className="hidden md:inline">Profile</span>
      </Link>

      <Link href="/workout" className="rounded-sm p-2 md:w-full">
        <FontAwesomeIcon className="md:mr-2" icon={faDumbbell} />
        <span className="hidden md:inline">Workout</span>
      </Link>

      <Link href="/exercise" className="rounded-sm p-2 md:w-full">
        <FontAwesomeIcon className="md:mr-2" icon={faDumbbell} />
        <span className="hidden md:inline">Exercises</span>
      </Link>

      <Link href="/settings" className="rounded-sm p-2 md:w-full">
        <FontAwesomeIcon className="md:mr-2" icon={faGear} />
        <span className="hidden md:inline">Settings</span>
      </Link>

      <div className="md:w-full">
        {user ? (
          <Link href="/">
            <Button variant="outline" className="md:w-full" onClick={logout}>
              Log out
            </Button>
          </Link>
        ) : (
          <Link href="/login" className="hover:bg-transparent md:w-full">
            <Button variant="outline" className="md:w-full cursor-pointer ">
              Login
            </Button>
          </Link>
        )}
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
