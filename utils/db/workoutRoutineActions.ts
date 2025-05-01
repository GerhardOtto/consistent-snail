"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { workout } from "./schema";

export const getWorkoutRoutines = async () => {
  const data = await db.select().from(workout);
  return data;
};

export const getWorkoutRoutinesForCategory = async (workoutCategoryId: number) => {
  const data = await db.select().from(workout).where(eq(workout.workoutCategoryId, workoutCategoryId));
  return data;
};

export const addWorkoutRoutine = async (id: number, displayName: string, sets: number, reps: number, workoutCategoryId: number) => {
  await db.insert(workout).values({
    id: id,
    displayName: displayName,
    sets: sets, 
    reps: reps, 
    workoutCategoryId: workoutCategoryId, 
  });
};

export const deleteWorkoutRoutine = async (id: number) => {
  await db.delete(workout).where(eq(workout.id, id));

  revalidatePath("/");
};

export const editWorkoutRoutine = async (id: number, displayName: string, sets: number, reps: number, workoutCategoryId: number) => {
  await db
    .update(workout)
    .set({ displayName: displayName, sets: sets, reps: reps, workoutCategoryId: workoutCategoryId })
    .where(eq(workout.id, id));

  revalidatePath("/");
};
