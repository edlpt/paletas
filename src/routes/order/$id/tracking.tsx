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

      {/* Success Header */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center pt-2 pb-6">
        <img src="/01_logo.png" alt="El De Las Paletas" className="w-48 h-auto object-contain mb-4 drop-shadow-[0_0_20px_var(--slime)]" />
        <p className="text-sm text-lime font-bold uppercase tracking-widest">Pedido confirmado</p>
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
              <p className="text-muted-foreground mb-1">Contacto</p>
              <p className="text-foreground">Chatear con la tienda</p>
            </div>
            
            <button className="flex items-center gap-2 rounded-full bg-lime px-5 py-2 text-xs font-bold text-black active:scale-95 shadow-[0_0_10px_var(--lime)]">
              <img src="/40_icon_chat.png" className="w-4 h-4" alt="Chat" />
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
