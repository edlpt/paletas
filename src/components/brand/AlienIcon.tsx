import { Alien } from "lucide-react";
import { cn } from "@/lib/utils";

// This is a placeholder for the actual Alien SVG from IMAGEN 1.
// The user should replace this with the real SVG or Image crop.
export function AlienIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center rounded-full bg-surface-2 p-4 border border-slime/30 shadow-glow", className)}>
       <Alien className="h-full w-full text-slime animate-float" strokeWidth={1.5} />
    </div>
  );
}
