"use server";

import { db } from "./db";
import { event } from "./schema";

export const getWorkoutEvent = async () => {
  const data = await db.select().from(event);
  return data;
};

// export const addWorkoutEvent2 = async (
//   workoutId: number,
//   weight: number,
//   sessionId: number
// ) => {
//   await db
//     .insert(event)
//     .values({
//       workoutId: workoutId,
//       weight: weight,
//     })
//     .returning({ id: event.id });
// };

export const addWorkoutEvent = async (
  workoutId: number,
  weight: number
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db
        .insert(event)
        .values({
          workoutId: workoutId,
          weight: weight,
        })
        .returning({ id: event.id });
      resolve(result[0].id);
    } catch (error) {
      console.error("Error adding workout session:", error);
      reject(error);
    }
  });
};
