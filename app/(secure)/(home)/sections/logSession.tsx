"use client";

import { WorkoutCategoryType } from "@/utils/db/schema";
import React, { useState } from "react";
import { SelectCategory } from "../components/selectCategory";
import { WorkoutWidget } from "../components/workoutWidget";

interface Props {
  categories: WorkoutCategoryType[];
}

export const LogSession: React.FC<Props> = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const handleCategorySelect = (id: number) => {
    setSelectedCategoryId(id);
  };
  
  return (
    <section className="mx-5">
      <SelectCategory
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      {selectedCategoryId && (
        <WorkoutWidget workoutCategoryId={selectedCategoryId} />
      )}
    </section>
  );
};
