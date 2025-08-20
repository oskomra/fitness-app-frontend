"use client";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="md:flex items-center justify-center p-4 md:gap-5 ring-2 bg:white ring-neutral-300 dark:bg-neutral-900 dark:ring-neutral-700">
      <div className="text-2xl font-semibold">
        <Link href="/">Fitness App</Link>
      </div>
      <div>
        {user ? (
          <Link href="/">
            <Button variant="outline" onClick={logout}>
              Log out
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
