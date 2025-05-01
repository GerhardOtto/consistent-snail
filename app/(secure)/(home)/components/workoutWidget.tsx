"use client";

import { getWorkoutRoutinesForCategory } from "@/utils/db/workoutRoutineActions";
import React from "react";
import { WorkoutCard } from "./workoutCard";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  workoutCategoryId: number;
  sessionId: number;
}

export const WorkoutWidget: React.FC<Props> = ({ workoutCategoryId, sessionId }) => {
  const [selectedWorkouts, setSelectedWorkouts] = useState<
    {
      id: number;
      displayName: string;
      sets: number;
      reps: number;
      workoutCategoryId: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getWorkoutRoutinesForCategory(workoutCategoryId);
      setSelectedWorkouts(data);
      setLoading(false);
    };

    if (workoutCategoryId) {
      fetchWorkouts();
    }
  }, [workoutCategoryId]);

  if (loading) {
    return         <Skeleton className="h-40 w-full" />;
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {selectedWorkouts.map((item) => (
          <WorkoutCard
            key={item.id}
            id={item.id}
            displayName={item.displayName}
            sets={item.sets}
            reps={item.reps}
            sessionId={sessionId}
          />
        ))}
      </div>
    </>
  );
};
