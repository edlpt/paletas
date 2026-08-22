import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { SlimeDivider } from "@/components/brand/SlimeDivider";

export const Route = createFileRoute("/age-gate")({
  component: AgeGate,
});

function AgeGate() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Save to localStorage or similar in a real app
    localStorage.setItem("age_verified", "true");
    navigate({ to: "/login" });
  };

  const handleDecline = () => {
    window.location.href = "https://google.com";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="absolute inset-0 z-0 bg-[image:var(--gradient-space)] mix-blend-screen opacity-40" />
      
      <div className="z-10 w-full max-w-sm rounded-[2rem] bg-surface p-8 shadow-card border border-slime/20 text-center animate-pop">
        <h1 className="font-graffiti text-4xl text-slime text-glow mb-4">
          ALTO AHÍ
        </h1>
        
        <SlimeDivider className="mb-6 h-6 opacity-80" />
        
        <p className="mb-8 text-lg font-medium text-foreground">
          Este espacio es <span className="text-lime font-bold">exclusivo para adultos</span>. 
          Al entrar, confirmas que eres mayor de edad según la normativa colombiana.
        </p>

        <div className="flex flex-col gap-4">
          <NeonButton onClick={handleConfirm} size="lg" className="text-lg">
            SÍ, SOY MAYOR
          </NeonButton>
          
          <NeonButton onClick={handleDecline} variant="ghost" size="md">
            No, quiero salir
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
