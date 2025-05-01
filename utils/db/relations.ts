import { relations } from "drizzle-orm/relations";
import { workoutCategory, workout, event, eventSession, session } from "./schema";

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

export const eventRelations = relations(event, ({one, many}) => ({
	workout: one(workout, {
		fields: [event.workoutId],
		references: [workout.id]
	}),
	eventSessions: many(eventSession),
}));

export const eventSessionRelations = relations(eventSession, ({one}) => ({
	event: one(event, {
		fields: [eventSession.eventId],
		references: [event.id]
	}),
	session: one(session, {
		fields: [eventSession.sessionId],
		references: [session.id]
	}),
}));

export const sessionRelations = relations(session, ({many}) => ({
	eventSessions: many(eventSession),
}));