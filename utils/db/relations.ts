import { relations } from "drizzle-orm/relations";
import { workoutCategory, workout, exerciseDay } from "./schema";

export const workoutRelations = relations(workout, ({one, many}) => ({
	workoutCategory: one(workoutCategory, {
		fields: [workout.workoutCategoryId],
		references: [workoutCategory.id]
	}),
	exerciseDays: many(exerciseDay),
}));

export const workoutCategoryRelations = relations(workoutCategory, ({many}) => ({
	workouts: many(workout),
}));

export const exerciseDayRelations = relations(exerciseDay, ({one}) => ({
	workout: one(workout, {
		fields: [exerciseDay.workoutId],
		references: [workout.id]
	}),
}));