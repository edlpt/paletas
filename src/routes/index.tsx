import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PsychedelicBanner } from "@/components/brand/PsychedelicBanner";
import { CategoryBubble } from "@/components/brand/CategoryBubble";
import { ProductCard } from "@/components/brand/ProductCard";
import { useState } from "react";
import { MOCK_PRODUCTS } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

export const Route = createFileRoute("/")({
  component: Index,
});

const CATEGORIES = [
  { id: "1", name: "Flores", icon: "/02_category_flores.png" },
  { id: "2", name: "Pre-rolls", icon: "/03_category_prerolls.png" },
  { id: "3", name: "Concentrados", icon: "/04_category_concentrados.png" },
  { id: "4", name: "Edibles", icon: "/05_category_edibles.png" },
  { id: "5", name: "Accesorios", icon: "/06_category_accesorios.png" },
  { id: "6", name: "Otros", icon: "/09_cookies.png" },
];

function Index() {
  const [activeCategoryId, setActiveCategoryId] = useState("1");
  const navigate = useNavigate();
  const { items } = useCart();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const filteredProducts = MOCK_PRODUCTS.filter(
    p => p.categoryId === activeCategoryId
  );

  return (
    <div className="flex min-h-screen flex-col pt-safe px-5 pb-32">
      {/* Header & Search */}
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">¿Qué buscas hoy?</h1>
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 border border-slime/20 shadow-glow-sm relative active:scale-95 transition-transform" onClick={() => navigate({ to: "/cart" })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-lime drop-shadow-[0_0_5px_var(--lime)]">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime border-2 border-black text-[9px] font-bold text-black">
                {cartItemCount}
              </span>
            )}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 border border-slime/20 shadow-glow-sm active:scale-95 transition-transform">
            <img src="/29_icon_bell.png" alt="Notificaciones" className="w-5 h-5 opacity-80" />
          </button>
        </div>
      </div>
      
      <div className="mt-6 relative">
        <img src="/21_icon_search.png" alt="Buscar" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full rounded-2xl border border-border bg-surface-2/50 py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lime focus:border-lime"
        />
      </div>

      {/* Categories */}
      <div className="mt-8 flex gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-5 px-5">
        {CATEGORIES.map((cat) => (
          <CategoryBubble
            key={cat.id}
            name={cat.name}
            iconUrl={cat.icon}
            active={activeCategoryId === cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
          />
        ))}
      </div>

      {/* Banner */}
      <div className="mt-6">
        <PsychedelicBanner />
      </div>

      {/* Featured Products */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Productos destacados</h3>
          <button className="text-sm font-medium text-lime hover:underline">Ver todo</button>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center opacity-70">
            <span className="text-4xl mb-4">👽</span>
            <p className="text-muted-foreground">No hay productos en esta categoría por ahora.</p>
          </div>
        )}
      </div>
    </div>
  );
}
