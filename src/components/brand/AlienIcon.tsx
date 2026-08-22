import { cn } from "@/lib/utils";

export function AlienIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center rounded-full bg-surface-2 p-4 border border-slime/30 shadow-glow", className)}>
       <img src="/14_alien_head.png" alt="Alien" className="h-full w-full object-contain animate-float" />
    </div>
  );
}
