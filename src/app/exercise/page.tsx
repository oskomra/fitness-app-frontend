import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExercisePage() {
  return (
    <>
      <h1 className="text-2xl font-semibold p-2 mb-2">Exercise</h1>
      <Card className="flex flex-col h-[calc(100vh-150px)]">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex justify-center items-center">
          <p>Select exercise</p>
        </CardContent>
      </Card>
    </>
  );
}
