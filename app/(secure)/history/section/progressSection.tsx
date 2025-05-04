"use client";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "../components/progressChart";
import { SelectCategory } from "../components/selectCategory";
import { WorkoutCategoryType } from "@/utils/db/schema";
import { getAllWorkoutEventsForSameCategory } from "@/utils/db/workoutProgressQueries";

interface Props {
  categories: WorkoutCategoryType[];
}

export const ProgressSection: React.FC<Props> = ({ categories }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [queryData, setQueryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategoryId) {
        const res = await getAllWorkoutEventsForSameCategory(
          selectedCategoryId
        );
        setQueryData(res);
      }
    };
    fetchData();
  }, [selectedCategoryId]);

  const handleCategorySelect = (id: number) => setSelectedCategoryId(id);

  return (
    <>
      <SelectCategory
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
      <ProgressChart chartData={queryData} />
    </>
  );
};
