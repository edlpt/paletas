import { createFileRoute } from "@tanstack/react-router";
import { PsychedelicBanner } from "@/components/brand/PsychedelicBanner";
import { CategoryBubble } from "@/components/brand/CategoryBubble";
import { ProductCard } from "@/components/brand/ProductCard";
import { Search, Bell } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/")({
  component: Index,
});

const CATEGORIES = [
  { id: "1", name: "Flores", iconType: "flower", active: true },
  { id: "2", name: "Pre-rolls", iconType: "joint" },
  { id: "3", name: "Concentrados", iconType: "jar" },
  { id: "4", name: "Comestibles", iconType: "cookie" },
  { id: "5", name: "Accesorios", iconType: "bong" },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Galletas Cósmicas",
    category: "Comestibles",
    price: 45000,
    thc: 100,
    imageUrl: "/placeholder.png",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Lemon Haze",
    category: "Flor Sativa",
    price: 60000,
    thc: 22,
    cbd: 2,
    weight: 1,
    imageUrl: "/placeholder.png",
    isAvailable: true,
  },
];

function Index() {
  return (
    <div className="flex min-h-screen flex-col pt-safe px-4 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 relative">
            {/* Logo placeholder */}
            <div className="absolute inset-0 bg-lime rounded-full blur-sm opacity-50" />
            <div className="absolute inset-0 border-2 border-lime rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Bienvenido a</h2>
            <h1 className="text-xl font-graffiti text-lime text-glow">El De Las Paletas</h1>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slime/30 bg-surface-2 text-foreground shadow-glow">
          <Bell size={20} />
        </button>
      </header>

      {/* Greeting & Search */}
      <div className="mt-2">
        <h2 className="mb-4 text-2xl font-bold text-foreground">¿Qué buscas hoy?</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full rounded-2xl border border-border bg-input py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-slime focus:outline-none focus:ring-1 focus:ring-slime shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => (
          <CategoryBubble
            key={cat.id}
            name={cat.name}
            iconType={cat.iconType as any}
            active={cat.active}
            onClick={() => {}}
          />
        ))}
      </div>

      {/* Banner */}
      <div className="mt-8">
        <PsychedelicBanner 
          title="Envíos rápidos"
          subtitle="en Medellín"
          ctaText="Explorar"
        />
      </div>

      {/* Featured Products */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Productos destacados</h3>
          <button className="text-sm font-medium text-slime hover:underline">Ver todo</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              imageUrl={product.imageUrl}
              isAvailable={product.isAvailable}
              thc={product.thc}
              weight={product.weight}
              onAdd={() => {}}
              onToggleFavorite={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
