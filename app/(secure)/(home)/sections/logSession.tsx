"use client";

import { WorkoutCategoryType } from "@/utils/db/schema";
import React, { useState } from "react";
import { SelectCategory } from "../components/selectCategory";
import { WorkoutWidget } from "../components/workoutWidget";
import { StartSession } from "../components/startSession";

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

  const [disableCategory, setDisableCategory] = useState<boolean>(false);

  const [sessionId, setSessionId] = useState<number | undefined>(undefined);
  const handleStartSession = (id: number) => {
    setSessionId(id);
    setDisableCategory(true);
  };

  return (
    <section className="mx-5">
      <SelectCategory
        categories={categories}
        onCategorySelect={handleCategorySelect}
        disableSelect={disableCategory}
      />
      {selectedCategoryId && (
        <StartSession onStartSession={handleStartSession} />
      )}
      {selectedCategoryId && sessionId && (
        <WorkoutWidget
          workoutCategoryId={selectedCategoryId}
          sessionId={sessionId}
        />
      )}
    </section>
  );
};
