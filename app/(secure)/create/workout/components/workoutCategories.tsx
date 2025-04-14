"use client";

import { WorkoutCategoryType } from "@/utils/db/schema";
import {
  addWorkoutCategory,
  deleteWorkoutCategory,
  editWorkoutCategory,
} from "@/utils/db/workoutCategoryActions";
import { FC, useState } from "react";
import { CreateWorkoutCategory } from "./createWorkoutCategory";
import { DeleteWorkoutCategory } from "./deleteWorkoutCategory";
import { UpdateWorkoutCategory } from "./updateWorkoutCategory";

interface Props {
  workoutCategories: WorkoutCategoryType[];
}

export const WorkoutCategories: FC<Props> = ({ workoutCategories }) => {
  const [workoutCategoryItems, setWorkoutCategoryItems] =
    useState<WorkoutCategoryType[]>(workoutCategories);

  const createWorkoutCategory = (displayName: string) => {
    const id = (workoutCategoryItems.at(-1)?.id || 0) + 1;
    addWorkoutCategory(id, displayName);
    setWorkoutCategoryItems((prev) => [...prev, { id: id, displayName }]);
  };

  const renameWorkoutCategory = (id: number, displayName: string) => {
    setWorkoutCategoryItems((prev) =>
      prev.map((workoutCategory) =>
        workoutCategory.id === id
          ? { ...workoutCategory, displayName }
          : workoutCategory
      )
    );
    editWorkoutCategory(id, displayName);
  };

  return (
    //   <div>
    //   {" "}

    //   <Button onClick={() => removeWorkoutCategory(1)}>Delete</Button>
    //   <Button onClick={() => renameWorkoutCategory(1, "Chinups")}>
    //     Rename
    //   </Button>
    // </div>

    <section>
      <CreateWorkoutCategory workoutCategories={workoutCategories} />
      <DeleteWorkoutCategory workoutCategories={workoutCategories} />
      <UpdateWorkoutCategory workoutCategories={workoutCategories} />
    </section>
  );
};
