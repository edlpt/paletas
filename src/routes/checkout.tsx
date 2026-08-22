import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const PAYMENT_METHODS = [
  { id: "card", name: "Tarjeta de crédito", detail: "**** **** **** 4242", icon: "/33_icon_card.png" },
  { id: "nequi", name: "Nequi", detail: "312 **** 5678", icon: "/48_payment_nequi.png" },
  { id: "daviplata", name: "Daviplata", detail: "312 **** 5678", icon: "/49_payment_daviplata.png" },
  { id: "cash", name: "Efectivo", detail: "Pago contra entrega", icon: "/50_payment_cash.png" },
];

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { total, clearCart } = useCart();
  const [step, setStep] = useState<"payment" | "success">("payment");
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
  const [finalTotal, setFinalTotal] = useState(0);

  const handlePay = () => {
    setFinalTotal(total);
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="flex min-h-screen flex-col bg-background relative pb-32">
        <div className="absolute top-0 left-0 w-full h-24 z-0 pointer-events-none overflow-hidden">
          <img src="/70_green_slime_bar.png" alt="Slime" className="w-full h-[150%] object-cover object-bottom opacity-90 -mt-4" />
        </div>
        
        <header className="relative z-10 flex items-center justify-center py-4 pt-safe mb-8">
          <button
            onClick={() => navigate({ to: "/" })}
            className="absolute left-4 flex h-10 w-10 items-center justify-center text-foreground"
          >
            <span className="text-xl font-bold">&lt;</span>
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-lime opacity-30 blur-2xl rounded-full" />
            <img src="/76_check_green.png" alt="Check" className="relative w-24 h-24 drop-shadow-[0_0_15px_var(--lime)]" />
          </div>
          
          <h2 className="text-2xl font-bold text-lime mb-2 text-center drop-shadow-md">¡Pedido confirmado!</h2>
          <p className="text-center text-muted-foreground mb-8 text-sm max-w-[250px]">
            Gracias por tu compra. Estamos preparando tu pedido.
          </p>

          <div className="w-full rounded-[2rem] bg-surface-2 p-6 border border-slime/20 mb-8">
            <h3 className="font-bold text-foreground mb-4">Pedido #{Math.floor(Math.random() * 90000) + 10000}</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Fecha</span>
              <span className="text-foreground">{new Date().toLocaleDateString("es-CO", { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-lime">${finalTotal.toLocaleString("es-CO")}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">Enviaremos los detalles a tu email.</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full p-5 pb-safe bg-surface-2 border-t border-border">
          <Link to="/orders" className="block w-full">
            <NeonButton size="lg" className="w-full text-lg font-bold bg-lime text-black border-none py-4">
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
        <h1 className="text-lg font-bold text-foreground">Métodos de pago</h1>
      </header>

      <div className="flex-1 px-5">
        <div className="flex flex-col gap-4">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex items-center gap-4 rounded-[2rem] p-4 border transition-all ${
                selectedMethod === method.id 
                  ? "bg-surface border-lime" 
                  : "bg-surface-2 border-border opacity-70 hover:opacity-100"
              }`}
            >
              <div className="h-10 w-10 shrink-0 flex items-center justify-center">
                <img src={method.icon} alt={method.name} className="w-8 h-8 object-contain" />
              </div>
              
              <div className="flex-1 text-left flex flex-col">
                <span className="font-bold text-foreground text-sm">{method.name}</span>
                <span className="text-xs text-muted-foreground">{method.detail}</span>
              </div>
              
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id ? "border-lime" : "border-muted-foreground"
              }`}>
                {selectedMethod === method.id && <div className="h-2.5 w-2.5 rounded-full bg-lime" />}
              </div>
            </button>
          ))}
        </div>
        
        <button className="mt-6 flex items-center justify-center gap-2 w-full py-4 border border-dashed border-muted-foreground rounded-[2rem] text-muted-foreground hover:text-lime hover:border-lime transition-colors">
          <span className="font-bold text-sm">Agregar método</span>
          <img src="/25_icon_plus.png" className="w-4 h-4 opacity-70" alt="Add" />
        </button>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-surface-2 px-5 py-6 pb-safe border-t border-border">
        <NeonButton 
          size="lg" 
          onClick={handlePay}
          className="w-full text-lg font-bold bg-lime text-black border-none py-4 disabled:opacity-50"
          disabled={total === 0}
        >
          Pagar ${total.toLocaleString("es-CO")}
        </NeonButton>
      </div>
    </div>
  );
}
