import { getWorkoutCategories } from "@/utils/db/workoutCategoryActions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LogSession } from "./sections/logSession";

export default async function PrivatePage() {
  const supabase = await createClient();
  const categories = await getWorkoutCategories();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <LogSession categories={categories} />
    </>
  );
}
