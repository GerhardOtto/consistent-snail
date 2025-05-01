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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkoutCategoryType } from "@/utils/db/schema";
import { deleteWorkoutCategory } from "@/utils/db/workoutCategoryActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  workoutCategories: WorkoutCategoryType[];
}

const formSchema = z.object({
  workoutCategoryId: z.string().min(1),
});

export const DeleteWorkoutCategory: FC<Props> = ({ workoutCategories }) => {
  const [workoutCategoryItems, setWorkoutCategoryItems] =
    useState<WorkoutCategoryType[]>(workoutCategories);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const removeWorkoutCategory = (id: number): Promise<void> => {
    // Optimistic UI update (optional, but can provide immediate feedback)
    setLoading(true);

    return deleteWorkoutCategory(id)
      .then(() => {
        // If deleteWorkoutCategory succeeds, the Promise resolves
        // You might not need to do anything further here if the
        // state update above is sufficient for immediate UI feedback.
        setWorkoutCategoryItems((prev) =>
          prev.filter((workoutCategory) => workoutCategory.id !== id)
        );
      })
      .catch((error) => {
        // If deleteWorkoutCategory fails, the Promise rejects
        console.error("Error deleting workout category:", error);
        // Optionally, you could revert the optimistic UI update here
        // if you want the UI to only update on successful deletion:
        // fetchUpdatedCategories(); // Or however you refresh your category list
        throw error; // Re-throw the error to be caught by the caller
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutCategoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const categoryIdToRemove = Number(values.workoutCategoryId);
    try {
      await removeWorkoutCategory(categoryIdToRemove);
      toast.success(`Successfully removed category.`);
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        `Failed to remove category: ${
          error.message || "An unexpected error occurred."
        }`
      );
      // Optionally, if you did an optimistic UI update, you might want to
      // refresh the category list here to revert the change on failure.
      // fetchUpdatedCategories();
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
          Delete Category
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Delete a Workout Category</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="workoutCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category to update" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workoutCategoryItems.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!loading && (
                  <Button type="submit" className="w-full" variant={"destructive"}>
                    Delete
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
