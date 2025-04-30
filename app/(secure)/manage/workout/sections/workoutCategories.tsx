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
import { WorkoutCategoryType } from "@/utils/db/schema";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { CreateWorkoutCategory } from "../components/createWorkoutCategory";
import { DeleteWorkoutCategory } from "../components/deleteWorkoutCategory";
import { UpdateWorkoutCategory } from "../components/updateWorkoutCategory";

interface Props {
  workoutCategories: WorkoutCategoryType[];
}

export const WorkoutCategories: FC<Props> = ({ workoutCategories }) => {
  return (
    <section className="flex justify-center mx-5">
      <Tabs defaultValue="workouts" className="w-96">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="workouts">
          <Card>
            <CardHeader>
              <CardTitle>Manage Workouts</CardTitle>
              <CardDescription>
                Create, update and delete your workouts here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
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
      </Tabs>
    </section>
  );
};
