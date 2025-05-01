"use server";

import { db } from "./db";
import { event } from "./schema";

export const getWorkoutEvent = async () => {
  const data = await db.select().from(event);
  return data;
};

export const addWorkoutEvent = async (workoutId: number, weight: number) => {
  await db.insert(event).values({
    workoutId: workoutId,
    weight: weight,
  });
};
