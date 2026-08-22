import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { SlimeDrip } from "@/components/brand/SlimeDrip";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { total, clearCart } = useCart();
  const [step, setStep] = useState<"summary" | "success">("summary");
  const [deliveryType, setDeliveryType] = useState<"normal" | "express">("normal");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: "store"|"me", text: string}[]>([]);
  const [chatInput, setChatInput] = useState("");

  const deliveryCost = deliveryType === "express" ? 50000 : 20000;
  const finalTotal = total + deliveryCost;

  const handleConfirm = () => {
    clearCart();
    setStep("success");
  };

  const openChat = () => {
    setIsChatOpen(true);
    if (chatMessages.length === 0) {
      // simulate instant message from store
      setTimeout(() => {
        setChatMessages([
          { 
            sender: "store", 
            text: `¿Qué más parcero? Tu pedido llega aproximadamente en ${deliveryType === "express" ? "15" : "30"} minutos.` 
          }
        ]);
      }, 500);
    }
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: "me", text: chatInput }]);
    setChatInput("");
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

        {/* Success Header */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-12 pb-6">
          <img src="/01_logo.png" alt="El De Las Paletas" className="w-48 h-auto object-contain mb-4 drop-shadow-[0_0_20px_var(--slime)]" />
          <p className="text-sm text-lime font-bold uppercase tracking-widest">Pedido confirmado</p>
        </div>

        <div className="flex-1 flex flex-col items-center px-5 relative z-10 mt-8">
          <div className="w-full rounded-[2rem] bg-surface-2 p-6 border border-slime/20 mb-8 shadow-glow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lime text-lg">Pedido #{Math.floor(Math.random() * 90000) + 10000}</h3>
                <p className="text-sm text-muted-foreground">Llega en {deliveryType === "express" ? "15" : "30"} min</p>
              </div>
              <span className="text-xl font-bold text-foreground">&gt;</span>
            </div>
            
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-xs text-muted-foreground">Dirección de entrega</span>
              <span className="text-sm font-medium text-foreground">Carrera 43A # 1-50, El Poblado, Medellín</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-border pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Contacto</span>
                <span className="text-sm font-medium text-foreground">Chatear con la tienda</span>
              </div>
              <button 
                onClick={openChat}
                className="flex items-center gap-2 rounded-full bg-lime px-5 py-2 text-xs font-bold text-black active:scale-95 shadow-[0_0_10px_var(--lime)]"
              >
                <img src="/40_icon_chat.png" className="w-4 h-4" alt="Chat" />
                Chat
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-4 right-4 z-40">
          <Link to="/orders" className="block w-full">
            <NeonButton size="lg" className="w-full text-lg font-bold bg-lime text-black border-none py-4 shadow-glow">
              Ir a mis pedidos
            </NeonButton>
          </Link>
        </div>

        {/* Chat Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface-2">
              <button onClick={() => setIsChatOpen(false)} className="w-10 h-10 flex items-center text-xl font-bold text-white">&lt;</button>
              <h3 className="font-bold text-lime">Tienda - El De Las Paletas</h3>
              <div className="w-10"></div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={cn("max-w-[80%] p-3 rounded-2xl text-sm", 
                  msg.sender === "store" 
                    ? "bg-surface-2 rounded-tl-sm self-start text-foreground border border-white/5" 
                    : "bg-lime text-black rounded-tr-sm self-end"
                )}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 bg-surface-2 border-t border-border pb-safe">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Escribe un mensaje..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-background border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-lime text-white"
                />
                <button 
                  onClick={sendMessage}
                  className="w-12 h-12 bg-lime rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                >
                  <span className="text-black font-bold transform rotate-90">^</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-40 overflow-x-hidden">
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
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <img src="/50_payment_cash.png" className="w-24 h-24" alt="Efectivo" />
          </div>
          <h2 className="text-xl font-bold text-lime mb-2">Pago en Efectivo</h2>
          <p className="text-sm text-muted-foreground mb-4 relative z-10">Solo aceptamos pagos en efectivo al momento de la entrega por tu seguridad y privacidad.</p>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="h-10 w-10 rounded-full bg-lime/20 flex items-center justify-center shrink-0">
              <img src="/50_payment_cash.png" className="w-6 h-6 object-contain" alt="Cash" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm">Pago contra entrega</span>
              <span className="text-xs text-lime">Tu único método de pago</span>
            </div>
          </div>
        </div>
        
        {/* Delivery Address */}
        <div className="mb-6 rounded-[1.5rem] p-5 border border-lime/30 bg-black relative overflow-hidden shadow-[0_0_15px_rgba(163,230,53,0.1)]">
          {/* Map background effect */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--lime) 1px, transparent 1px)', backgroundSize: '16px 16px', backgroundPosition: '0 0' }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
          <img src="/60_tracking_pin.png" className="absolute right-4 bottom-4 w-12 h-12 opacity-20 filter grayscale" alt="Map" />
          
          <div className="relative z-10 flex items-start justify-between mb-3">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse"></span>
              Dirección de entrega
            </h3>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur border border-lime/20 active:scale-95 text-white hover:text-lime transition-colors pb-1.5 font-bold tracking-widest leading-none outline-none focus:outline-none">
              ...
            </button>
          </div>
          <div className="relative z-10 flex flex-col pl-4 border-l-2 border-lime/30 ml-1">
            <span className="font-bold text-lime text-sm">Casa</span>
            <span className="text-sm text-white font-medium mt-1">Carrera 43A # 1-50, El Poblado</span>
            <span className="text-xs text-lime/70 mt-0.5">Medellín, Antioquia</span>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-6">
          <h3 className="font-bold text-foreground mb-3 px-1">Método de envío</h3>
          <div className="flex flex-col gap-3">
            {/* Delivery Normal */}
            <button 
              onClick={() => setDeliveryType("normal")}
              className={cn(
                "w-full rounded-[1.5rem] p-4 flex items-center justify-between border transition-all text-left",
                deliveryType === "normal" 
                  ? "bg-surface-2 border-lime shadow-[0_0_15px_rgba(163,230,53,0.15)]" 
                  : "bg-background border-white/10 opacity-70"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", deliveryType === "normal" ? "border-lime" : "border-muted-foreground")}>
                  {deliveryType === "normal" && <div className="w-2.5 h-2.5 rounded-full bg-lime" />}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Domicilio Normal</div>
                  <div className="text-xs text-muted-foreground">30-45 minutos</div>
                </div>
              </div>
              <div className="font-bold text-foreground">$20.000</div>
            </button>

            {/* Delivery Express */}
            <button 
              onClick={() => setDeliveryType("express")}
              className={cn(
                "w-full rounded-[1.5rem] p-4 flex items-center justify-between border transition-all text-left",
                deliveryType === "express" 
                  ? "bg-surface-2 border-lime shadow-[0_0_15px_rgba(163,230,53,0.15)]" 
                  : "bg-background border-white/10 opacity-70"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", deliveryType === "express" ? "border-lime" : "border-muted-foreground")}>
                  {deliveryType === "express" && <div className="w-2.5 h-2.5 rounded-full bg-lime" />}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm flex items-center gap-2">
                    Domicilio Express
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-lime text-black font-black uppercase">Fast</span>
                  </div>
                  <div className="text-xs text-muted-foreground">10-15 minutos</div>
                </div>
              </div>
              <div className="font-bold text-foreground">$50.000</div>
            </button>
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
            <span className="text-foreground">${deliveryCost.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-bold text-foreground">Total a pagar</span>
            <span className="font-bold text-lime">${finalTotal.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-surface-2 px-5 py-6 pb-safe border-t border-border z-40">
        <NeonButton 
          size="lg" 
          onClick={handleConfirm}
          className="w-full text-lg font-bold bg-lime text-black border-none py-4 disabled:opacity-50"
          disabled={total === 0}
        >
          Confirmar pedido - ${finalTotal.toLocaleString("es-CO")}
        </NeonButton>
      </div>
    </div>
  );
}
