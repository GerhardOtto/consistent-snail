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
import { WorkoutCategoryType, WorkoutRoutineType } from "@/utils/db/schema";
import { editWorkoutRoutine } from "@/utils/db/workoutRoutineActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  workoutRoutines: WorkoutRoutineType[];
  workoutCategories: WorkoutCategoryType[];
}

const formSchema = z.object({
  workoutRoutineId: z.string(),
  workoutRoutineName: z.string(),
  sets: z.string().min(1),
  reps: z.string().min(1),
  workoutCategoryId: z.string(),
});

export const UpdateWorkoutRoutine: FC<Props> = ({
  workoutRoutines,
  workoutCategories,
}) => {
  const [workoutRoutineItems, setWorkoutRoutineItems] =
    useState<WorkoutRoutineType[]>(workoutRoutines);

  const [workoutCategoryItems, setWorkoutCategoryItems] =
    useState<WorkoutCategoryType[]>(workoutCategories);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateWorkoutRoutine = (
    id: number,
    displayName: string,
    sets: number,
    reps: number,
    workoutCategoryId: number
  ): Promise<void> => {
    setLoading(true);
    return editWorkoutRoutine(id, displayName, sets, reps, workoutCategoryId)
      .then(() => {
        setWorkoutRoutineItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, displayName, sets, reps, workoutCategoryId }
              : item
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
      workoutRoutineName: "",
      sets: "",
      reps: "",
      workoutCategoryId: "",
    },
  });

  const { setValue } = form;

  const handleRoutineChange = (routineId: string) => {
    const selectedRoutine = workoutRoutineItems.find(
      (routine) => String(routine.id) === routineId
    );

    if (selectedRoutine) {
      setValue("workoutRoutineName", selectedRoutine.displayName);
      setValue("sets", String(selectedRoutine.sets));
      setValue("reps", String(selectedRoutine.reps));
      setValue("workoutCategoryId", String(selectedRoutine));
    } else {
      setValue("workoutRoutineName", "");
      setValue("sets", "");
      setValue("reps", "");
      setValue("workoutCategoryId", "");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateWorkoutRoutine(
        parseInt(values.workoutRoutineId, 10),
        values.workoutRoutineName,
        parseInt(values.sets, 10),
        parseInt(values.reps, 10),
        parseInt(values.workoutCategoryId, 10)
      );
      toast.success(`Updated routine: ${values.workoutRoutineName}`);
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        `Failed to update routine: ${
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
          Update Routine
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Update a Workout Routine</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="workoutRoutineId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routine</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleRoutineChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a routine to update" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {workoutRoutineItems.map((item) => (
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
                  name="workoutRoutineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sets</FormLabel>
                      <FormControl>
                        <Input placeholder="3" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reps</FormLabel>
                      <FormControl>
                        <Input placeholder="9" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            <SelectValue placeholder="Select a new category" />
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
