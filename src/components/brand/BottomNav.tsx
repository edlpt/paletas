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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[88px] flex-col justify-end bg-background pb-safe">
      {/* Top Slime Drip Edge */}
      <div className="absolute top-0 left-0 w-full -mt-4 transform rotate-180 pointer-events-none">
        <img src="/70_green_slime_bar.png" alt="Slime edge" className="w-full h-auto opacity-90" />
      </div>

      <div className="flex h-[72px] items-center justify-around px-2 relative z-10">
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
