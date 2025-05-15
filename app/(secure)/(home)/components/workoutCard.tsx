"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addWorkoutEvent } from "@/utils/db/workoutEventActions";
import { addWorkoutEventOnWorkoutSession } from "@/utils/db/workoutSessionAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  id: number;
  displayName: string;
  sets: number;
  reps: number;
  sessionId: number | undefined;
  activeSession: boolean
}

const formSchema = z.object({
  weightUsed: z.string().min(1),
});

export const WorkoutCard: FC<Props> = ({
  id,
  displayName,
  sets,
  reps,
  sessionId,
  activeSession
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter()

  const createWorkoutEvent = async (weight: number): Promise<void> => {
    setLoading(true);
    try {
      const workoutId = await addWorkoutEvent(id, weight);
      if (sessionId) {
        await addWorkoutEventOnWorkoutSession(workoutId, sessionId);
      }
    } catch (error) {
      console.debug(`Create workout event: ${error}`);
    } finally {
      setLoading(false);
      // router.push(".");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weightUsed: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      await createWorkoutEvent(Number(value.weightUsed))
      toast.success(`Successfully stored workout event`);
    } catch (error: any) {
      toast.error(
        `Failed to store event: ${
          error.message || "An unexpected error occurred."
        }`
      );
    }
  }

  return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{displayName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 w-full items-center gap-4">
                  <div className="flex gap-x-3 items-center justify-center">
                    <Label className="h-full" htmlFor="name">
                      Sets
                    </Label>
                    <Badge className="w-1/3">{sets}</Badge>
                  </div>
                  <div className="flex gap-x-3 items-center justify-center">
                    <Label className="h-full" htmlFor="name">
                      Reps
                    </Label>
                    <Badge className="w-1/3">{reps}</Badge>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="weightUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight Used</FormLabel>
                      <FormControl>
                        <Input placeholder="Weight" {...field} type="number" disabled={!activeSession} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                {!loading && (
                  <Button type="submit" className="w-full" disabled={!activeSession}>
                    Submit
                  </Button>
                )}
                {loading && (
                  <Button disabled className="w-full">
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>
      </>
    )
};
