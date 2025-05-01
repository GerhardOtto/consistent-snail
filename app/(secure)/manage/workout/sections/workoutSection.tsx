"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkoutCategoryType, WorkoutRoutineType } from "@/utils/db/schema";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { CreateWorkoutCategory } from "../components/createWorkoutCategory";
import { DeleteWorkoutCategory } from "../components/deleteWorkoutCategory";
import { UpdateWorkoutCategory } from "../components/updateWorkoutCategory";
import { CreateWorkoutRoutine } from "../components/createWorkoutRoutine";
import { UpdateWorkoutRoutine } from "../components/updateWorkoutRoutine";

interface Props {
  workoutCategories: WorkoutCategoryType[];
  workoutRoutines: WorkoutRoutineType[];
}

export const WorkoutSection: FC<Props> = ({ workoutCategories, workoutRoutines }) => {
  return (
    <section className="flex justify-center mx-5">
      <Tabs defaultValue="routines" className="w-96">
        <TabsContent value="routines">
          <Card>
            <CardHeader>
              <CardTitle>Manage Routines</CardTitle>
              <CardDescription>
                Create, update and delete your workout routines here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <CreateWorkoutRoutine workoutRoutines={workoutRoutines} workoutCategories={workoutCategories}/>
              </div>
              <div className="space-y-1">
                <UpdateWorkoutRoutine workoutRoutines={workoutRoutines} workoutCategories={workoutCategories} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Manage Categories</CardTitle>
              <CardDescription>
                Create, update and delete your workout categories here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <CreateWorkoutCategory workoutCategories={workoutCategories} />
              </div>
              <div className="space-y-1">
                <DeleteWorkoutCategory workoutCategories={workoutCategories} />
              </div>
              <div className="space-y-1">
                <UpdateWorkoutCategory workoutCategories={workoutCategories} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="routines">Routines</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  );
};
