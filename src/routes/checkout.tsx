import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { SlimeDrip } from "@/components/brand/SlimeDrip";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { total, clearCart } = useCart();
  const [step, setStep] = useState<"summary" | "success">("summary");
  const [finalTotal, setFinalTotal] = useState(0);

  const handleConfirm = () => {
    setFinalTotal(total);
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="flex min-h-screen flex-col bg-background relative pb-32">
        <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
          <SlimeDrip className="h-16" />
        </div>
        
        <header className="relative z-10 flex justify-between items-center px-4 py-4 pt-safe mb-2">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex h-10 w-10 items-center justify-center text-foreground"
          >
            <span className="text-xl font-bold">&lt;</span>
          </button>
          <span className="font-bold text-foreground">Seguimiento</span>
          <div className="w-10"></div>
        </header>

        {/* SVG Map Area */}
        <div className="relative z-10 w-full h-[30vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-lime drop-shadow-[0_0_10px_var(--lime)] mb-2">En camino</h2>
          <p className="text-sm text-muted-foreground mb-8">Tu pedido está en camino</p>
          
          <div className="absolute inset-0 top-1/3 flex justify-center pointer-events-none">
            <svg viewBox="0 0 300 200" className="w-[80%] h-full overflow-visible">
              <path 
                d="M 20 150 Q 80 150 120 100 T 250 50" 
                fill="none" 
                stroke="var(--lime)" 
                strokeWidth="4" 
                strokeDasharray="8 8"
                className="drop-shadow-[0_0_10px_var(--lime)]"
              />
              <circle cx="20" cy="150" r="8" fill="var(--lime)" className="drop-shadow-[0_0_10px_var(--lime)]" />
              <circle cx="250" cy="50" r="12" fill="var(--surface-2)" stroke="var(--lime)" strokeWidth="4" className="drop-shadow-[0_0_10px_var(--lime)]" />
              <image href="/25_icon_plus.png" x="242" y="42" width="16" height="16" />
            </svg>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center px-5 relative z-10 mt-8">
          <div className="w-full rounded-[2rem] bg-surface-2 p-6 border border-slime/20 mb-8 shadow-glow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lime text-lg">Pedido #{Math.floor(Math.random() * 90000) + 10000}</h3>
                <p className="text-sm text-muted-foreground">Llega en 15 min</p>
              </div>
              <span className="text-xl font-bold text-foreground">&gt;</span>
            </div>
            
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-xs text-muted-foreground">Dirección</span>
              <span className="text-sm font-medium text-foreground">El Poblado, Medellín</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-border pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Mensajero</span>
                <span className="text-sm font-medium text-foreground">Juan Esteban</span>
              </div>
              <button className="flex items-center gap-2 rounded-full border border-slime/20 bg-background px-4 py-2 text-xs font-bold text-lime">
                <img src="/29_icon_bell.png" className="w-4 h-4" alt="Contactar" />
                Contactar
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-4 right-4 z-50">
          <Link to="/orders" className="block w-full">
            <NeonButton size="lg" className="w-full text-lg font-bold bg-lime text-black border-none py-4 shadow-glow">
              Ir a mis pedidos
            </NeonButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-32">
      <header className="flex items-center justify-center relative py-4 pt-safe mb-4">
        <button
          onClick={() => navigate({ to: "/cart" })}
          className="absolute left-4 flex h-10 w-10 items-center justify-center text-foreground"
        >
          <span className="text-xl font-bold">&lt;</span>
        </button>
        <h1 className="text-lg font-bold text-foreground">Confirmar pedido</h1>
      </header>

      <div className="flex-1 px-5">
        <div className="mb-6 rounded-[2rem] p-6 border border-slime bg-surface/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <img src="/50_payment_cash.png" className="w-24 h-24" alt="Efectivo" />
          </div>
          <h2 className="text-xl font-bold text-lime mb-2">Pago en Efectivo</h2>
          <p className="text-sm text-muted-foreground mb-4">Solo aceptamos pagos en efectivo al momento de la entrega por tu seguridad y privacidad.</p>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-lime/20 flex items-center justify-center">
              <img src="/50_payment_cash.png" className="w-6 h-6 object-contain" alt="Cash" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground">Pago contra entrega</span>
              <span className="text-xs text-lime">Tu único método de pago</span>
            </div>
          </div>
        </div>
        
        <div className="w-full rounded-[2rem] bg-surface-2 p-6 border border-slime/20">
          <h3 className="font-bold text-foreground mb-4">Resumen</h3>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${total.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between text-sm mb-4 border-b border-border pb-4">
            <span className="text-muted-foreground">Envío</span>
            <span className="text-lime font-bold">Gratis</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-bold text-foreground">Total a pagar</span>
            <span className="font-bold text-lime">${total.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-surface-2 px-5 py-6 pb-safe border-t border-border">
        <NeonButton 
          size="lg" 
          onClick={handleConfirm}
          className="w-full text-lg font-bold bg-lime text-black border-none py-4 disabled:opacity-50"
          disabled={total === 0}
        >
          Confirmar pedido - ${total.toLocaleString("es-CO")}
        </NeonButton>
      </div>
    </div>
  );
}
