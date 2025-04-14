"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "./db";
import { workoutCategory } from "./schema";

export const getWorkoutCategories = async () => {
  const data = await db.select().from(workoutCategory);
  return data;
};

export const addWorkoutCategory = async (id: number, displayName: string) => {
  await db.insert(workoutCategory).values({
    id: id,
    displayName: displayName,
  });
};

export const deleteWorkoutCategory = async (id: number) => {
  await db.delete(workoutCategory).where(eq(workoutCategory.id, id));

  revalidatePath("/");
};

export const editWorkoutCategory = async (id: number, displayName: string) => {
  await db
    .update(workoutCategory)
    .set({ displayName: displayName })
    .where(eq(workoutCategory.id, id));

  revalidatePath("/");
};
