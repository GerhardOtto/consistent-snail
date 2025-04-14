"use client";

import { Button } from "@/components/ui/button";
import {
  addWorkoutCategory,
  deleteWorkoutCategory,
  editWorkoutCategory,
} from "@/utils/db/workoutCategoryActions";
import { workoutCategory, WorkoutCategoryType } from "@/utils/db/schema";
import { FC, useState } from "react";

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

  const removeWorkoutCategory = (id: number) => {
    setWorkoutCategoryItems((prev) =>
      prev.filter((workoutCategory) => workoutCategory.id !== id)
    );
    deleteWorkoutCategory(id);
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
    <div>
      {workoutCategoryItems.map((item, index) => (
        <span key={index}>{item.displayName}</span>
      ))}
      <Button onClick={() => createWorkoutCategory("Pullups")}>Create</Button>
      <Button onClick={() => removeWorkoutCategory(1)}>Delete</Button>
      <Button onClick={() => renameWorkoutCategory(1, "Chinups")}>
        Rename
      </Button>
    </div>
  );
};
