import { getWorkoutCategories } from "@/utils/db/workoutCategoryActions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProgressChart } from "./components/progressChart";
import { getWorkoutEvent } from "@/utils/db/workoutEventActions";
import { getWorkoutSession } from "@/utils/db/workoutSessionAction";
import { Button } from "@/components/ui/button";
import { getAllWorkoutEventsForSameCategory } from "@/utils/db/workoutProgressQueries";
import { SelectCategory } from "../(home)/components/selectCategory";
import { ProgressSection } from "./section/progressSection";
import { getWorkoutRoutines } from "@/utils/db/workoutRoutineActions";

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
    const categories = await getWorkoutCategories();
    const routines = await getWorkoutRoutines();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
    <ProgressSection categories={routines}/>
    </>
  );
}
