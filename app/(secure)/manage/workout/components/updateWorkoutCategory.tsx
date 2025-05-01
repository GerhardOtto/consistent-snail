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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkoutCategoryType } from "@/utils/db/schema";
import { editWorkoutCategory } from "@/utils/db/workoutCategoryActions";
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
  workoutCategoryId: z.string().min(1),
});

export const UpdateWorkoutCategory: FC<Props> = ({ workoutCategories }) => {
  const [workoutCategoryItems, setWorkoutCategoryItems] =
    useState<WorkoutCategoryType[]>(workoutCategories);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const renameWorkoutCategory = (
    id: number,
    displayName: string
  ): Promise<void> => {
    setLoading(true);
    return editWorkoutCategory(id, displayName)
      .then(() => {
        setWorkoutCategoryItems((prev) =>
          prev.map((workoutCategory) =>
            workoutCategory.id === id
              ? { ...workoutCategory, displayName }
              : workoutCategory
          )
        );
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutCategoryName: "",
    },
  });

  const { setValue } = form;

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = workoutCategoryItems.find(
      (category) => String(category.id) === categoryId
    );

    if (selectedCategory) {
      setValue("workoutCategoryName", selectedCategory.displayName);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await renameWorkoutCategory(
        Number(values.workoutCategoryId),
        values.workoutCategoryName
      );
      toast.success(`Updated category to: ${values.workoutCategoryName}`);
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        `Failed to update category: ${
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
          Update Category
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Update a Workout Category</DrawerTitle>
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
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCategoryChange(value);
                        }}
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
                  <Button
                    type="submit"
                    className="w-full"
                    variant={"destructive"}
                  >
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
