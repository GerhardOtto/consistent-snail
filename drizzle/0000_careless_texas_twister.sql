-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "workout" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "workout_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"display_name" varchar(255) NOT NULL,
	"sets" smallint NOT NULL,
	"reps" smallint NOT NULL,
	"workout_category_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_day" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "exercise_day_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date NOT NULL,
	"workout_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_category" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "workout_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"display_name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workout" ADD CONSTRAINT "workout_workout_category_id_fkey" FOREIGN KEY ("workout_category_id") REFERENCES "public"."workout_category"("id") ON DELETE set null ON UPDATE set null;--> statement-breakpoint
ALTER TABLE "exercise_day" ADD CONSTRAINT "exercise_day_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id") ON DELETE restrict ON UPDATE cascade;
*/