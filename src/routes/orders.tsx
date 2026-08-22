import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Package, Clock, CheckCircle2 } from "lucide-react";
import { NeonButton } from "@/components/brand/NeonButton";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

const MOCK_ORDERS = [
  {
    id: "42069",
    date: "12 Oct 2023",
    total: 125000,
    status: "in_transit",
    items: 3,
  },
  {
    id: "42068",
    date: "05 Oct 2023",
    total: 45000,
    status: "delivered",
    items: 1,
  },
];

function Orders() {
  return (
    <div className="flex min-h-screen flex-col pt-safe px-4 pb-24 bg-background">
      <header className="flex items-center gap-4 py-4">
        <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-foreground hover:bg-surface-2/80">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Mis Pedidos</h1>
      </header>

      <div className="mt-4 flex flex-col gap-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-card border border-slime/10">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div>
                <p className="font-bold text-foreground">Pedido #{order.id}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lime">${order.total.toLocaleString("es-CO")}</p>
                <p className="text-xs text-muted-foreground">{order.items} artículos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {order.status === "in_transit" ? (
                <>
                  <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Clock size={16} className="text-yellow-500" />
                  </div>
                  <p className="text-sm font-medium text-yellow-500">En camino</p>
                </>
              ) : (
                <>
                  <div className="h-8 w-8 rounded-full bg-lime/20 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-lime" />
                  </div>
                  <p className="text-sm font-medium text-lime">Entregado</p>
                </>
              )}
            </div>

            {order.status === "in_transit" && (
              <Link to={`/order/${order.id}/tracking`} className="mt-2">
                <NeonButton size="sm" variant="outline" className="w-full">
                  Rastrear pedido
                </NeonButton>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
