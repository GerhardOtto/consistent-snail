import { pgTable, integer, varchar, foreignKey, smallint, real, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const workoutCategory = pgTable("workout_category", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "workout_category_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	displayName: varchar("display_name", { length: 255 }).notNull(),
});

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
}, (table) => [
	foreignKey({
			columns: [table.workoutId],
			foreignColumns: [workout.id],
			name: "event_workout_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const eventSession = pgTable("event_session", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "event_session_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	eventId: integer("event_id").notNull(),
	sessionId: integer("session_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [event.id],
			name: "event_session_event_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.sessionId],
			foreignColumns: [session.id],
			name: "event_session_session_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const session = pgTable("session", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "session_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	date: date().notNull(),
});

export type WorkoutRoutineType = typeof workout.$inferSelect;
export type ExerciseEventType = typeof event.$inferSelect;
export type WorkoutCategoryType = typeof workoutCategory.$inferSelect;