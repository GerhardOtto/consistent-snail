import { pgTable, foreignKey, integer, varchar, smallint, date } from "drizzle-orm/pg-core"
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
		}).onUpdate("set null").onDelete("set null"),
]);

export const exerciseDay = pgTable("exercise_day", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "exercise_day_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	date: date().notNull(),
	workoutId: integer("workout_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.workoutId],
			foreignColumns: [workout.id],
			name: "exercise_day_workout_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const workoutCategory = pgTable("workout_category", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "workout_category_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	displayName: varchar("display_name", { length: 255 }).notNull(),
});

export type Workout = typeof workout.$inferSelect;
export type ExerciseDay = typeof exerciseDay.$inferSelect;
export type WorkoutCategory = typeof workoutCategory.$inferSelect;