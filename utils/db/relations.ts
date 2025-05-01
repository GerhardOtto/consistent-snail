import { relations } from "drizzle-orm/relations";
import { workoutCategory, workout, event } from "./schema";

export const workoutRelations = relations(workout, ({one, many}) => ({
	workoutCategory: one(workoutCategory, {
		fields: [workout.workoutCategoryId],
		references: [workoutCategory.id]
	}),
	events: many(event),
}));

export const workoutCategoryRelations = relations(workoutCategory, ({many}) => ({
	workouts: many(workout),
}));

export const eventRelations = relations(event, ({one}) => ({
	workout: one(workout, {
		fields: [event.workoutId],
		references: [workout.id]
	}),
}));