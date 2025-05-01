import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LogSession } from "./sections/logSession";
import { getWorkoutCategories } from "@/utils/db/workoutCategoryActions";

export default async function PrivatePage() {
  const supabase = await createClient();
  const categories = await getWorkoutCategories();
  console.log(categories);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <section>
      <p className="mx-5">Hello {data.user.email}</p>
      <LogSession categories={categories} />
    </section>
  );
}
