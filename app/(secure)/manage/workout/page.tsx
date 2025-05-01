import { getWorkoutCategories } from "@/utils/db/workoutCategoryActions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WorkoutSection } from "./sections/workoutSection";
import { getWorkoutRoutines } from "@/utils/db/workoutRoutineActions";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const categories = await getWorkoutCategories();
  const routines = await getWorkoutRoutines();

  return (
      <WorkoutSection workoutCategories={categories} workoutRoutines={routines}/>
  );
}
