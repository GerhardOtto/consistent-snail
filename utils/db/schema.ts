import { pgTable, foreignKey, integer, varchar, smallint, real, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const workout = pgTable("workout", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "workout_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	displayName: varchar("display_name", { length: 255 }).notNull(),
	sets: smallint().notNull(),
	reps: smallint().notNull(),
	workoutCategoryId: integer("workout_category_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.workoutCategoryId],
			foreignColumns: [workoutCategory.id],
			name: "workout_workout_category_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const event = pgTable("event", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "event_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	workoutId: integer("workout_id").notNull(),
	weight: real().notNull(),
	date: date().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.workoutId],
			foreignColumns: [workout.id],
			name: "event_workout_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const workoutCategory = pgTable("workout_category", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "workout_category_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	displayName: varchar("display_name", { length: 255 }).notNull(),
});

export type WorkoutRoutineType = typeof workout.$inferSelect;
export type ExerciseEventType = typeof event.$inferSelect;
export type WorkoutCategoryType = typeof workoutCategory.$inferSelect;