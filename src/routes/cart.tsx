import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

const CART_ITEMS = [
  {
    id: "1",
    name: "Lemon Haze",
    detail: "1g",
    price: 60000,
    quantity: 1,
    imageUrl: "/08_tree_flower.png",
  },
  {
    id: "2",
    name: "Pre-rolls Cósmicos",
    detail: "2 unidades",
    price: 20000,
    quantity: 1,
    imageUrl: "/03_category_prerolls.png",
  },
  {
    id: "3",
    name: "Galletas Cósmicas",
    detail: "100mg THC",
    price: 45000,
    quantity: 1,
    imageUrl: "/09_cookies.png",
  },
];

function Cart() {
  const navigate = useNavigate();
  const subtotal = CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-32">
      <header className="flex items-center justify-center relative py-4 pt-safe mb-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="absolute left-4 flex h-10 w-10 items-center justify-center text-foreground"
        >
          <span className="text-xl font-bold">&lt;</span>
        </button>
        <h1 className="text-lg font-bold text-foreground">Carrito</h1>
      </header>

      <div className="flex-1 px-5">
        <div className="flex flex-col gap-4">
          {CART_ITEMS.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-surface-2 p-2 border border-slime/20">
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain drop-shadow-md" />
              </div>
              
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-red-500">
                    <img src="/45_icon_trash.png" alt="Eliminar" className="w-5 h-5 opacity-60 hover:opacity-100" />
                  </button>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-bold text-lime">${item.price.toLocaleString("es-CO")}</p>
                  <div className="flex items-center gap-3 bg-surface-2 rounded-full px-2 py-1 border border-border">
                    <button className="flex h-6 w-6 items-center justify-center text-foreground opacity-70">
                      <img src="/26_icon_minus.png" alt="-" className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                    <button className="flex h-6 w-6 items-center justify-center text-lime opacity-80">
                      <img src="/25_icon_plus.png" alt="+" className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-2 px-5 py-6 pb-safe border-t border-border">
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Subtotal</span>
            <span className="font-bold text-foreground">${subtotal.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Envío</span>
            <span className="font-bold text-lime">Gratis</span>
          </div>
          <div className="border-t border-border mt-2 pt-2 flex justify-between">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-lime">${total.toLocaleString("es-CO")}</span>
          </div>
        </div>

        <Link to="/checkout" className="block w-full">
          <NeonButton size="lg" className="w-full text-lg font-bold bg-lime text-black border-none py-4">
            Proceder al pago
          </NeonButton>
        </Link>
      </div>
    </div>
  );
}
