import { Button } from "@/components/ui/button";
import { SatelliteDish } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="font-bold tracking-tighter text-5xl">
            Oops! Lost in Cyberspace
          </h1>
          <p className="text-gray-500">
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <Button className="hover:animate-none animate-pulse" asChild>
          <Link href="/" prefetch={false}>
            Return to website <SatelliteDish />
          </Link>
        </Button>
      </div>
    </div>
  );
}
