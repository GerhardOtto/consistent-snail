import { Button } from "@/components/ui/button";
import { addWorkoutSession } from "@/utils/db/workoutSessionAction";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onStartSession: (id: number) => void;
  setActiveSession: (active: boolean) => void
  activeSession: boolean
}

export const StartSession: React.FC<Props> = ({ onStartSession, setActiveSession, activeSession }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const CreateWorkoutSession = async (): Promise<void> => {
    setLoading(true);
    try {
      const sessionId = await addWorkoutSession();
      onStartSession(sessionId);
      toast.success(`Started session number: ${sessionId}`);
      setActiveSession(true)
    } catch (error) {
      console.error("Error creating workout session:", error);
      toast.error(
        `Failed to start session: ${
          (error as Error).message || "An unexpected error occurred."
        }`
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && !activeSession && (
        <Button type="submit" className="w-full" onClick={CreateWorkoutSession}>
          Start Session
        </Button>
      )}
      {!loading && activeSession && (
        <Button
          type="submit"
          className="w-full"
          onClick={CreateWorkoutSession}
          disabled
        >
          Session Started
        </Button>
      )}
      {loading && (
        <Button disabled className="w-full">
          <Loader2 className="animate-spin" />
          Loading
        </Button>
      )}
    </>
  );
};
