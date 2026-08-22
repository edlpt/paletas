import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MapPin, Package, Truck, CheckCircle2 } from "lucide-react";
import { SlimeDivider } from "@/components/brand/SlimeDivider";

export const Route = createFileRoute("/order/$id/tracking")({
  component: OrderTracking,
});

const TRACKING_STEPS = [
  { id: 1, label: "Pedido confirmado", icon: CheckCircle2, completed: true, time: "10:30 AM" },
  { id: 2, label: "Preparando", icon: Package, completed: true, time: "10:45 AM" },
  { id: 3, label: "En camino", icon: Truck, completed: false, time: null },
  { id: 4, label: "Entregado", icon: MapPin, completed: false, time: null },
];

function OrderTracking() {
  const { id } = Route.useParams();

  return (
    <div className="flex min-h-screen flex-col pt-safe px-4 pb-24 bg-background">
      <header className="flex items-center gap-4 py-4">
        <Link to="/orders" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:bg-surface-2/80">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Seguimiento</h1>
          <p className="text-xs text-muted-foreground">Pedido #{id}</p>
        </div>
      </header>

      {/* Map Placeholder */}
      <div className="mt-4 h-64 w-full overflow-hidden rounded-3xl bg-surface-2 relative border border-slime/20 shadow-glow">
        <div className="absolute inset-0 bg-[image:var(--gradient-space)] opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-slime animate-bounce mb-2" />
            <p className="text-sm font-medium text-foreground">El repartidor está en camino...</p>
            <p className="text-xs text-lime">Tiempo estimado: 15 min</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-surface p-6 shadow-card border border-psy/20">
        <h3 className="mb-6 text-lg font-bold text-foreground">Estado del pedido</h3>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-border" />
          
          <div className="flex flex-col gap-6">
            {TRACKING_STEPS.map((step, index) => {
              const isLast = index === TRACKING_STEPS.length - 1;
              return (
                <div key={step.id} className="relative z-10 flex gap-4">
                  <div 
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                      step.completed 
                        ? "border-slime bg-slime text-primary-foreground shadow-glow" 
                        : "border-border bg-surface-2 text-muted-foreground"
                    }`}
                  >
                    <step.icon size={18} />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-center">
                    <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    {step.time && (
                      <p className="text-xs text-muted-foreground mt-0.5">{step.time}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <SlimeDivider className="my-8 h-4 opacity-30" />
      
      {/* Delivery details */}
      <div className="rounded-2xl bg-surface-2 p-4 border border-border">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-surface border border-slime/20 flex items-center justify-center">
             <span className="text-xl">👽</span>
          </div>
          <div>
            <p className="font-bold text-foreground">Alien Express (Repartidor)</p>
            <p className="text-sm text-muted-foreground">Placas: UFO-420</p>
          </div>
        </div>
      </div>
    </div>
  );
}
