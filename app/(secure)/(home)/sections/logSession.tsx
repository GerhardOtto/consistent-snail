"use client"

import { WorkoutCategoryType } from "@/utils/db/schema";
import React, { useState } from "react";
import { SelectCategory } from "../components/selectCategory";

interface Props {
  categories: WorkoutCategoryType[];
}

export const LogSession: React.FC<Props> = ({ categories }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
    const handleCategorySelect = (id: number) => {
        setSelectedCategoryId(id);
    }
  return (
    <>
      <SelectCategory categories={categories} onCategorySelect={handleCategorySelect}/>

    </>
  );
};
