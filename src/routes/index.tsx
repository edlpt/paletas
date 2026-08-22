import { createFileRoute } from "@tanstack/react-router";
import { PsychedelicBanner } from "@/components/brand/PsychedelicBanner";
import { CategoryBubble } from "@/components/brand/CategoryBubble";
import { ProductCard } from "@/components/brand/ProductCard";

export const Route = createFileRoute("/")({
  component: Index,
});

const CATEGORIES = [
  { id: "1", name: "Flores", icon: "/02_category_flores.png", active: true },
  { id: "2", name: "Pre-rolls", icon: "/03_category_prerolls.png" },
  { id: "3", name: "Concentrados", icon: "/04_category_concentrados.png" },
  { id: "4", name: "Edibles", icon: "/05_category_edibles.png" },
  { id: "5", name: "Accesorios", icon: "/06_category_accesorios.png" },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Galletas Cósmicas",
    category: "100mg THC",
    price: 45000,
    imageUrl: "/09_cookies.png",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Lemon Haze",
    category: "Flor Sativa",
    price: 60000,
    imageUrl: "/08_tree_flower.png",
    isAvailable: true,
  },
];

function Index() {
  return (
    <div className="flex min-h-screen flex-col pt-safe px-5 pb-32">
      {/* Header & Search */}
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">¿Qué buscas hoy?</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 border border-slime/20">
          <img src="/29_icon_bell.png" alt="Notificaciones" className="w-5 h-5 opacity-80" />
        </button>
      </div>
      
      <div className="mt-6 relative">
        <img src="/21_icon_search.png" alt="Buscar" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full rounded-2xl border-none bg-surface-2/50 py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-slime"
        />
      </div>

      {/* Categories */}
      <div className="mt-8 flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => (
          <CategoryBubble
            key={cat.id}
            name={cat.name}
            iconUrl={cat.icon}
            active={cat.active}
            onClick={() => {}}
          />
        ))}
      </div>

      {/* Banner */}
      <div className="mt-8">
        <PsychedelicBanner />
      </div>

      {/* Featured Products */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Productos destacados</h3>
          <button className="text-sm font-medium text-lime hover:underline">Ver todo</button>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
