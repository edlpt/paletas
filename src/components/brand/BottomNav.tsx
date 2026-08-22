import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "Inicio", to: "/" },
  { icon: Search, label: "Explorar", to: "/search" },
  { icon: ShoppingBag, label: "Carrito", to: "/cart" },
  { icon: ClipboardList, label: "Pedidos", to: "/orders" },
  { icon: User, label: "Perfil", to: "/profile" },
];

export function BottomNav() {
  // TanStack Router's useLocation hook
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-slime/20 bg-surface/90 pb-safe backdrop-blur-md">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-all duration-300",
              isActive ? "text-slime scale-110 drop-shadow-[0_0_8px_var(--slime)]" : "text-muted-foreground hover:text-slime/70"
            )}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
