import { createFileRoute, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { ChevronLeft, CreditCard, Wallet, Banknote, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const [step, setStep] = useState<"payment" | "success">("payment");

  if (step === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="absolute inset-0 z-0 bg-[image:var(--gradient-space)] mix-blend-screen opacity-40" />
        
        <div className="z-10 w-full max-w-sm rounded-[2rem] bg-surface p-8 shadow-card border border-slime text-center animate-pop">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slime/20 shadow-glow">
            <CheckCircle2 className="h-10 w-10 text-slime" />
          </div>
          
          <h1 className="font-graffiti text-3xl text-slime text-glow mb-2">
            ¡Pedido confirmado!
          </h1>
          
          <p className="mb-8 text-sm text-muted-foreground">
            Gracias por tu compra.<br />
            Estamos preparando tu pedido.
          </p>

          <div className="rounded-xl bg-surface-2 p-4 text-left mb-8 border border-border">
            <p className="text-sm font-bold text-foreground mb-1">Pedido #42069</p>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Fecha</span>
              <span>{new Date().toLocaleDateString("es-CO")}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-lime mt-2 pt-2 border-t border-border">
              <span>Total</span>
              <span>$125.000</span>
            </div>
          </div>

          <Link to="/orders">
            <NeonButton size="lg" className="w-full">
              Ir a mis pedidos
            </NeonButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col pt-safe px-4 pb-24 bg-background">
      <header className="flex items-center gap-4 py-4">
        <Link to="/cart" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:bg-surface-2/80">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Métodos de pago</h1>
      </header>

      <div className="mt-6 flex flex-col gap-4">
        {/* Payment Option 1 */}
        <label className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-slime bg-surface p-4 shadow-glow">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2">
              <CreditCard className="text-lime" />
            </div>
            <div>
              <p className="font-bold text-foreground">Tarjeta de crédito</p>
              <p className="text-xs text-muted-foreground">**** **** **** 4242</p>
            </div>
          </div>
          <div className="h-5 w-5 rounded-full border-2 border-slime bg-slime" />
        </label>

        {/* Payment Option 2 */}
        <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-surface p-4 opacity-70">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2">
              <Wallet className="text-psy" />
            </div>
            <div>
              <p className="font-bold text-foreground">Nequi</p>
              <p className="text-xs text-muted-foreground">312 **** 5678</p>
            </div>
          </div>
          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
        </label>

        {/* Payment Option 3 */}
        <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-surface p-4 opacity-70">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2">
              <Banknote className="text-yellow-500" />
            </div>
            <div>
              <p className="font-bold text-foreground">Efectivo</p>
              <p className="text-xs text-muted-foreground">Pago contra entrega</p>
            </div>
          </div>
          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
        </label>
      </div>

      <NeonButton variant="outline" className="mt-6 border-dashed" onClick={() => {}}>
        + Agregar método
      </NeonButton>

      <div className="mt-auto pt-8">
        <NeonButton size="lg" className="w-full" onClick={() => setStep("success")}>
          Pagar $125.000
        </NeonButton>
      </div>
    </div>
  );
}
