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
import { WorkoutRoutineType } from "@/utils/db/schema";
import { deleteWorkoutRoutine } from "@/utils/db/workoutRoutineActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  workoutRoutines: WorkoutRoutineType[];
}

const formSchema = z.object({
  workoutRoutineId: z.string().min(1),
});

export const DeleteWorkoutRoutine: FC<Props> = ({ workoutRoutines }) => {
  const [workoutRoutineItems, setWorkoutRoutineItems] =
    useState<WorkoutRoutineType[]>(workoutRoutines);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const removeWorkoutRoutine = (id: number): Promise<void> => {
    setLoading(true);

    return deleteWorkoutRoutine(id)
      .then(() => {
        setWorkoutRoutineItems((prev) =>
          prev.filter((workoutRoutine) => workoutRoutine.id !== id)
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
      workoutRoutineId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await removeWorkoutRoutine(Number(values.workoutRoutineId));
      toast.success(`Successfully removed routine.`);
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        `Failed to remove routine: ${
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
          Delete Routine
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Delete a Workout Routine</DrawerTitle>
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a routine to delete" />
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
