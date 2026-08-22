import { createFileRoute, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { QuantitySelector } from "@/components/brand/QuantitySelector";
import { SlimeDivider } from "@/components/brand/SlimeDivider";
import { Trash2, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

const MOCK_CART = [
  {
    id: "1",
    name: "Lemon Haze",
    price: 60000,
    quantity: 1,
    imageUrl: "/placeholder.png",
    weight: 1,
  },
  {
    id: "2",
    name: "Pre-rolls Cósmicos",
    price: 20000,
    quantity: 2,
    imageUrl: "/placeholder.png",
  },
];

function Cart() {
  const subtotal = MOCK_CART.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col pt-safe px-4 pb-24 bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 py-4">
        <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:bg-surface-2/80">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Carrito</h1>
      </header>

      {/* Cart Items */}
      <div className="mt-4 flex flex-col gap-4">
        {MOCK_CART.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-2xl bg-surface p-4 shadow-card border border-slime/10">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-2">
               <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            </div>
            
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground">{item.name}</h3>
                  {item.weight && <p className="text-sm text-muted-foreground">{item.weight}g</p>}
                </div>
                <button className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lime">${item.price.toLocaleString("es-CO")}</span>
                <QuantitySelector value={item.quantity} onChange={() => {}} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <SlimeDivider className="my-8 h-4 opacity-30" />

      {/* Summary */}
      <div className="rounded-2xl bg-surface p-6 shadow-card border border-psy/20 mb-8">
        <div className="flex justify-between mb-3 text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-foreground font-medium">${subtotal.toLocaleString("es-CO")}</span>
        </div>
        <div className="flex justify-between mb-4 text-muted-foreground">
          <span>Envío</span>
          <span className="text-slime font-bold">Gratis</span>
        </div>
        <div className="flex justify-between border-t border-border pt-4">
          <span className="text-lg font-bold text-foreground">Total</span>
          <span className="text-xl font-bold text-lime">${subtotal.toLocaleString("es-CO")}</span>
        </div>
      </div>

      <Link to="/checkout" className="mt-auto">
        <NeonButton size="lg" className="w-full">
          Proceder al pago
        </NeonButton>
      </Link>
    </div>
  );
}
