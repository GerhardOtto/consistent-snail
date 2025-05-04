"use server";

import { db } from "./db";
import { eq, inArray } from "drizzle-orm";
import { workoutCategory, event, workout } from "./schema";

export const getAllWorkoutEventsForSameCategory = async (
  categoryId: number
) => {
  // 1. Find the target workout category.
  const targetCategory = await db
    .select()
    .from(workoutCategory)
    .where(eq(workoutCategory.id, categoryId))
    .then((rows) => rows[0]);

  // 2. Find all workouts belonging to that category.
  const workoutsInCategory = await db
    .select({ id: workout.id })
    .from(workout)
    .where(eq(workout.workoutCategoryId, targetCategory.id));

  const workoutIds = workoutsInCategory.map((w) => w.id);

  // 3. Join events with workouts and categories 
  const eventsWithCategoryAndWeight = await db
    .select({
      workoutCategoryName: workoutCategory.displayName,
      eventWeight: event.weight,
    })
    .from(event)
    .innerJoin(workout, eq(event.workoutId, workout.id))
    .innerJoin(
      workoutCategory,
      eq(workout.workoutCategoryId, workoutCategory.id)
    )
    .where(inArray(event.workoutId, workoutIds));

  return eventsWithCategoryAndWeight;
};
