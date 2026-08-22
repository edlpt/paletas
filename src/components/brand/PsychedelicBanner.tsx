import { Link } from "@tanstack/react-router";

export function PsychedelicBanner() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-psy-deep p-6 shadow-psy border border-psy/40">
      <div className="absolute inset-0 bg-[image:var(--gradient-psy)] opacity-30 mix-blend-screen" />
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="max-w-[160px]">
          <h2 className="font-bold text-xl text-white drop-shadow-md">
            Envíos rápidos
          </h2>
          <p className="text-psy/80 text-sm font-medium mb-1 drop-shadow-md">
            en Medellín
          </p>
        </div>
        
        <div className="relative h-24 w-24">
          <img 
            src="/07_rocket.png" 
            alt="Rocket" 
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_15px_var(--psy)] animate-float" 
          />
        </div>
      </div>
      
      {/* Indicadores de paginación simulados */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-slime" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
