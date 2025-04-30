"use client";

import { WorkoutCategoryType } from "@/utils/db/schema";
import { FC } from "react";
import { CreateWorkoutCategory } from "./createWorkoutCategory";
import { DeleteWorkoutCategory } from "./deleteWorkoutCategory";
import { UpdateWorkoutCategory } from "./updateWorkoutCategory";

interface Props {
  workoutCategories: WorkoutCategoryType[];
}

export const WorkoutCategories: FC<Props> = ({ workoutCategories }) => {
  return (
    <section>
      <CreateWorkoutCategory workoutCategories={workoutCategories} />
      <DeleteWorkoutCategory workoutCategories={workoutCategories} />
      <UpdateWorkoutCategory workoutCategories={workoutCategories} />
    </section>
  );
};
