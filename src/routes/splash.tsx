import { createFileRoute, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";

export const Route = createFileRoute("/splash")({
  component: Splash,
});

function Splash() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background px-6 py-12 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 z-0 bg-[image:var(--gradient-space)] mix-blend-screen opacity-60" />
      
      {/* Logo */}
      <div className="z-10 mt-8 w-full max-w-[280px]">
        <img src="/01_logo.png" alt="El De Las Paletas" className="w-full h-auto drop-shadow-[0_0_15px_var(--slime)]" />
      </div>

      {/* Astronaut Alien */}
      <div className="z-10 flex-1 flex items-center justify-center w-full max-w-[300px]">
        <img 
          src="/13_alien_astronaut.png" 
          alt="Alien Astronaut" 
          className="w-full h-auto animate-float drop-shadow-2xl" 
        />
      </div>
      
      {/* Bottom Text and Actions */}
      <div className="z-10 flex flex-col items-center w-full text-center pb-8">
        <h2 className="text-lg text-foreground font-medium">Bienvenido a</h2>
        <h1 className="text-2xl font-bold text-lime mb-2 drop-shadow-md">
          El De Las Paletas
        </h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-[220px]">
          Tu espacio legal, seguro y 100% real.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <Link to="/login" className="w-full">
            <NeonButton size="lg" className="w-full text-lg font-bold bg-lime text-black border-none shadow-[0_0_20px_-5px_var(--lime)] hover:bg-lime/90">
              Entrar
            </NeonButton>
          </Link>
          <Link to="/register" className="w-full">
            <NeonButton variant="ghost" size="lg" className="w-full text-lg font-bold text-yellow-400 hover:text-yellow-300">
              Crear cuenta
            </NeonButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
