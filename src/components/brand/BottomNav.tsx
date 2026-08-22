import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: "/18_cannabis_leaf.png", label: "Inicio", to: "/" },
  { icon: "/22_icon_bag.png", label: "Pedidos", to: "/orders" },
  { icon: "/23_icon_user.png", label: "Perfil", to: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50 flex h-[72px] flex-col justify-center rounded-[2rem] bg-surface-2/90 backdrop-blur-md border border-slime/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(57,255,20,0.15)] overflow-hidden">
      <div className="flex h-full items-center justify-around px-2 relative z-10">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center p-2 transition-all duration-300",
                isActive ? "scale-110 drop-shadow-[0_0_10px_var(--lime)] opacity-100" : "opacity-50 hover:opacity-80"
              )}
            >
              <img 
                src={item.icon} 
                alt={item.label} 
                className={cn("h-8 w-8 object-contain mb-1", isActive ? "" : "filter grayscale")} 
              />
              <span className={cn(
                "text-[10px] font-bold tracking-wider",
                isActive ? "text-lime" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
