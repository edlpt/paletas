import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order/$id/tracking")({
  component: OrderTracking,
});

function OrderTracking() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col pt-safe px-5 pb-8 bg-background">
      <header className="flex items-center justify-center relative py-4 mb-8">
        <button
          onClick={() => navigate({ to: "/orders" })}
          className="absolute left-0 flex h-10 w-10 items-center justify-center text-foreground"
        >
          <span className="text-xl font-bold">&lt;</span>
        </button>
        <h1 className="text-lg font-bold text-foreground">Seguimiento</h1>
      </header>

      {/* Main Status Text */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-lime mb-2 drop-shadow-[0_0_15px_rgba(183,255,0,0.4)]">En camino</h2>
        <p className="text-sm text-muted-foreground">Tu pedido está en camino</p>
      </div>

      {/* Map Graphic Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center min-h-[300px] mb-8">
        <div className="relative w-full max-w-[280px]">
          <img src="/61_tracking_line.png" alt="Ruta" className="w-full h-auto drop-shadow-[0_0_10px_var(--lime)]" />
          
          <img 
            src="/60_tracking_pin.png" 
            alt="Origen" 
            className="absolute top-[-10%] right-[15%] w-10 h-10"
          />
          
          <div className="absolute bottom-[-10%] left-[10%] bg-surface-2 rounded-full p-2 border border-slime">
            <img 
              src="/62_tracking_alien.png" 
              alt="Repartidor" 
              className="w-8 h-8 animate-pulse-glow"
            />
          </div>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="rounded-[2rem] bg-surface-2 p-6 border border-slime/20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-foreground">Pedido #{id}</h3>
          <span className="text-xl text-muted-foreground font-bold">&gt;</span>
        </div>
        <p className="text-lime font-bold mb-6">Llega en 15 min</p>
        
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Dirección</p>
            <p className="text-foreground">El Poblado, Medellín</p>
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
            <div>
              <p className="text-muted-foreground mb-1">Mensajero</p>
              <p className="text-foreground">Juan Esteban</p>
            </div>
            
            <button className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-slime/20">
              <img src="/69_contact.png" alt="Contactar" className="w-5 h-5" />
              <span className="font-bold text-foreground text-xs">Contactar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
