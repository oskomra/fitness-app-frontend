import { Card, CardContent } from "@/components/ui/card";

export default function ExercisePage() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardContent className="flex flex-1 items-center justify-center">
        <p className="text-2xl">Select exercise</p>
      </CardContent>
    </Card>
  );
}
