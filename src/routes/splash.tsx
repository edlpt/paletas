import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AlienIcon } from "@/components/brand/AlienIcon";

export const Route = createFileRoute("/splash")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to age-gate after 2.5 seconds
    const timer = setTimeout(() => {
      navigate({ to: "/age-gate" });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Glow background */}
      <div className="absolute inset-0 z-0 bg-[image:var(--gradient-space)] mix-blend-screen opacity-60 animate-pulse-glow" />
      
      <div className="z-10 flex flex-col items-center animate-pop">
        {/* Placeholder for real logo or alien */}
        <div className="relative mb-6 h-32 w-32 drop-shadow-[0_0_20px_var(--slime)]">
           <AlienIcon className="h-full w-full text-slime" />
        </div>
        
        <h1 className="font-graffiti text-5xl text-slime text-center text-glow mb-2">
          El De Las
          <br />
          Paleta$
        </h1>
        
        {/* Slime loader */}
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-slime animate-drip"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
