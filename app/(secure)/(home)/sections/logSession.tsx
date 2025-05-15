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

  const [activeSession, setActiveSession] = useState<boolean>(false)

  return (
    <section className="mx-5 space-y-5">
      <SelectCategory
        categories={categories}
        onCategorySelect={handleCategorySelect}
        disableSelect={disableCategory}
      />
      {selectedCategoryId && (
        <WorkoutWidget
          workoutCategoryId={selectedCategoryId}
          sessionId={sessionId} activeSession={activeSession} />
      )}
      {selectedCategoryId && (
        <StartSession onStartSession={handleStartSession} setActiveSession={setActiveSession} activeSession={activeSession} />
      )}
    </section>
  );
};
