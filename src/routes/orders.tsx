import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

const TABS = ["Todos", "En camino", "Entregados", "Cancelados"];

const MOCK_ORDERS = [
  {
    id: "42069",
    date: "22 mayo, 2024",
    total: 125000,
    status: "En camino",
    statusColor: "text-lime",
  },
  {
    id: "41987",
    date: "18 mayo, 2024",
    total: 80000,
    status: "Entregado",
    statusColor: "text-lime",
  },
  {
    id: "41915",
    date: "10 mayo, 2024",
    total: 60000,
    status: "Entregado",
    statusColor: "text-lime",
  },
];

function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Todos");

  return (
    <div className="flex min-h-screen flex-col bg-background pb-32">
      <header className="flex items-center justify-center relative py-4 pt-safe mb-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="absolute left-4 flex h-10 w-10 items-center justify-center text-foreground"
        >
          <span className="text-xl font-bold">&lt;</span>
        </button>
        <h1 className="text-lg font-bold text-foreground">Mis pedidos</h1>
      </header>

      {/* Tabs */}
      <div className="flex px-5 gap-4 overflow-x-auto no-scrollbar mb-6 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              activeTab === tab 
                ? "bg-lime text-black" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="flex-1 px-5 flex flex-col gap-4">
        {MOCK_ORDERS.map((order) => (
          <Link
            key={order.id}
            to={`/order/${order.id}/tracking`}
            className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4 border border-border hover:border-slime/30 transition-colors"
          >
            <div className="h-12 w-12 shrink-0 rounded-xl bg-surface border border-slime/20 flex items-center justify-center p-2">
              <img src="/22_icon_bag.png" alt="Pedido" className="h-full w-full object-contain opacity-80" />
            </div>
            
            <div className="flex flex-1 flex-col justify-center">
              <h3 className="font-bold text-foreground text-sm mb-1">Pedido #{order.id}</h3>
              <p className="text-xs text-muted-foreground mb-1">{order.date}</p>
              <p className={`text-xs font-bold ${order.statusColor}`}>{order.status}</p>
            </div>
            
            <div className="flex flex-col items-end justify-center">
              <p className="font-bold text-lime mb-2">${order.total.toLocaleString("es-CO")}</p>
              <span className="text-muted-foreground font-bold text-lg">&gt;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
