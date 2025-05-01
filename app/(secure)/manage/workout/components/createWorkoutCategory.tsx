import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WorkoutCategoryType } from "@/utils/db/schema";
import { addWorkoutCategory } from "@/utils/db/workoutCategoryActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  workoutCategories: WorkoutCategoryType[];
}

const formSchema = z.object({
  workoutCategoryName: z.string().min(1).max(50),
});

export const CreateWorkoutCategory: FC<Props> = ({ workoutCategories }) => {
  const [workoutCategoryItems, setWorkoutCategoryItems] =
    useState<WorkoutCategoryType[]>(workoutCategories);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createWorkoutCategory = (displayName: string): Promise<void> => {
    setLoading(true);
    const id = (workoutCategoryItems.at(-1)?.id || 0) + 1;
    return addWorkoutCategory(id, displayName)
      .then(() => {
        setWorkoutCategoryItems((prev) => [...prev, { id: id, displayName }]);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setLoading(false));
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutCategoryName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      createWorkoutCategory(values.workoutCategoryName);
      toast.success(`Created category: ${values.workoutCategoryName}`);
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        `Failed to create category: ${
          error.message || "An unexpected error occurred."
        }`
      );
    }
  }
  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full"
        >
          Create Category
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create a Workout Category</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="workoutCategoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!loading && (
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                )}
                {loading && (
                  <Button disabled className="w-full">
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                )}
              </form>
            </Form>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
