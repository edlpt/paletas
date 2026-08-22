import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const MENU_ITEMS = [
  { id: "orders", label: "Mis pedidos", icon: "/22_icon_bag.png", to: "/orders" },
  { id: "address", label: "Direcciones", icon: "/24_icon_location.png", to: "/profile" },
  { id: "payment", label: "Métodos de pago", icon: "/35_icon_wallet.png", to: "/profile" },
  { id: "notifications", label: "Notificaciones", icon: "/29_icon_bell.png", to: "/profile" },
  { id: "support", label: "Ayuda y soporte", icon: "/42_icon_info.png", to: "/profile" },
];

function Profile() {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-32 relative">
      {/* Top Slime */}
      <div className="absolute top-0 left-0 w-full h-24 z-0 pointer-events-none overflow-hidden">
        <img src="/70_green_slime_bar.png" alt="Slime" className="w-full h-[150%] object-cover object-bottom opacity-90 -mt-4" />
      </div>

      <header className="relative z-10 flex items-center justify-center p-4 pt-safe mb-4">
        <h1 className="text-lg font-bold text-foreground">Mi Perfil</h1>
      </header>

      {/* User Info */}
      <div className="relative z-10 flex flex-col items-center px-5 mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-lime opacity-30 blur-2xl rounded-full" />
          <div className="relative h-24 w-24 rounded-full border-2 border-slime p-2 bg-surface-2 overflow-hidden shadow-[0_0_20px_var(--slime)]">
            <img src="/15_saturn_alien.png" alt="Avatar" className="h-full w-full object-contain" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground">Paletero420</h2>
        <p className="text-sm text-muted-foreground mb-4">Medellín, Colombia</p>

        <div className="flex w-full gap-4 max-w-[280px]">
          <div className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-surface-2 p-3 border border-slime/20">
            <span className="text-xs text-muted-foreground mb-1">Compras</span>
            <span className="text-xl font-bold text-lime">15</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center rounded-2xl bg-surface-2 p-3 border border-slime/20">
            <span className="text-xs text-muted-foreground mb-1">Favoritos</span>
            <span className="text-xl font-bold text-lime">8</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 px-5">
        <div className="flex flex-col gap-2">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4 transition-colors hover:bg-surface-2/80 border border-border"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background border border-slime/20">
                <img src={item.icon} alt={item.label} className="w-5 h-5 opacity-80" />
              </div>
              <span className="flex-1 font-medium text-foreground">{item.label}</span>
              <span className="text-muted-foreground text-xl">&gt;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
