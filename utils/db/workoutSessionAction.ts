"use server";

import { db } from "./db";
import { session } from "./schema";

export const getWorkoutSession = async () => {
  const data = await db.select().from(session);
  return data;
};

export const addWorkoutSession = async (): Promise<number> => {
  const date: Date = new Date();
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db
        .insert(session)
        .values({
          date: date.toISOString(),
        })
        .returning();
      resolve(result[0].id);
    } catch (error) {
      console.error("Error adding workout session:", error);
      reject(error);
    }
  });
};
