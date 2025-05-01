import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LogSession } from "./sections/logSession";
import { getWorkoutCategories } from "@/utils/db/workoutCategoryActions";
import { WorkoutCard } from "./components/workoutCard";

export default async function PrivatePage() {
  const supabase = await createClient();
  const categories = await getWorkoutCategories();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <section>
      <p className="mx-5">Hello {data.user.email}</p>
      <LogSession categories={categories} />
      {/* <WorkoutCard id={1} displayName={"DisplayName"} sets={3} reps={3}/> */}
    </section>
  );
}
