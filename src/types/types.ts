export type TargetMuscle = {
  id: number;
  name: string;
};

export type Equipment = {
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
