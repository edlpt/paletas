import { createFileRoute, Link } from "@tanstack/react-router";
import { AlienIcon } from "@/components/brand/AlienIcon";
import { SlimeDivider } from "@/components/brand/SlimeDivider";
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  ChevronRight,
  LogOut
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const PROFILE_LINKS = [
  { icon: ShoppingBag, label: "Mis pedidos", to: "/orders" },
  { icon: MapPin, label: "Direcciones", to: "/addresses" },
  { icon: CreditCard, label: "Métodos de pago", to: "/payments" },
  { icon: Bell, label: "Notificaciones", to: "/notifications" },
  { icon: HelpCircle, label: "Ayuda y soporte", to: "/help" },
];

function Profile() {
  return (
    <div className="flex min-h-screen flex-col pt-safe px-4 pb-24 bg-background">
      {/* Header */}
      <header className="flex items-center justify-center py-4 relative">
        <h1 className="text-xl font-bold text-foreground">Mi Perfil</h1>
      </header>

      {/* Profile Card */}
      <div className="mt-4 relative overflow-hidden rounded-[2rem] bg-surface p-6 shadow-card border border-slime/20">
        <div className="absolute inset-0 bg-[image:var(--gradient-psy)] opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-4 bg-slime rounded-t-[2rem]" />
        
        <div className="relative z-10 flex items-center gap-4 mt-2">
          <div className="h-20 w-20 shrink-0">
            <AlienIcon className="h-full w-full bg-surface-2 border-none shadow-none" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Paletero420</h2>
            <p className="text-sm text-muted-foreground">Medellín, Colombia</p>
          </div>
        </div>
        
        <div className="relative z-10 mt-6 flex justify-around border-t border-border pt-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Compras</p>
            <p className="font-graffiti text-xl text-lime">15</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Favoritos</p>
            <p className="font-graffiti text-xl text-psy">8</p>
          </div>
        </div>
        
        <SlimeDivider className="absolute bottom-0 left-0 w-full h-4 opacity-50" flip />
      </div>

      {/* Links */}
      <div className="mt-6 flex flex-col gap-2">
        {PROFILE_LINKS.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className="flex items-center justify-between rounded-2xl bg-surface p-4 border border-transparent hover:border-slime/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2">
                <link.icon size={20} className="text-lime" />
              </div>
              <span className="font-medium text-foreground">{link.label}</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive transition-colors hover:bg-destructive/20">
        <LogOut size={20} />
        <span className="font-bold">Cerrar Sesión</span>
      </button>
    </div>
  );
}
