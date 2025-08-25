import ExerciseLibrary from "@/components/exercise/exercise-library";

export default function ExerciseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex px-24 py-4">
      <main className="md:w-2/3 p-4">{children}</main>
      <div className="md:w-1/3 md:min-w-64 md:max-w-96">
        <ExerciseLibrary />
      </div>
    </div>
  );
}
