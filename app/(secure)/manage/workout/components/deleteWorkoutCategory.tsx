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

  const removeWorkoutCategory = (id: number) => {
    setWorkoutCategoryItems((prev) =>
      prev.filter((workoutCategory) => workoutCategory.id !== id)
    );
    deleteWorkoutCategory(id);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutCategoryId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    removeWorkoutCategory(Number(values.workoutCategoryId));
    // TODO: Display deleted category name
    // toast(`Removed Category: ${workoutCategoryName}`);
    toast(`Removed Category.`);
    setOpen(false);
    form.reset();
    console.log(values);
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
                <Button type="submit" className="w-full">
                  Submit
                </Button>
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
