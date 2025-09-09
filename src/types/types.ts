export type TargetMuscle = {
  id: number;
  name: string;
};

export type SecondaryMuscle = {
  id: number;
  name: string;
};

export type Equipment = {
  id: number;
  name: string;
};

export type BodyPart = {
  id: number;
  name: string;
};

export type Exercise = {
  exerciseId: string;
  name: string;
  gifUrl: string;
  targetMuscles: TargetMuscle[];
  equipments: Equipment[];
};

export type WorkoutExerciseSet = {
  id: number;
  setNumber: number;
  reps: number;
  weight: number;
  workoutExerciseId: number;
};

export type WorkoutExercise = {
  id: number;
  sets: WorkoutExerciseSet[];
  workoutId: number;
  exerciseId: string;
};

export type Workout = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  userId: number;
  exercises: WorkoutExercise[];
};
