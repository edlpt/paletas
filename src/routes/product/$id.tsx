import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Share2, Heart, Star, Info } from "lucide-react";
import { NeonButton } from "@/components/brand/NeonButton";
import { QuantitySelector } from "@/components/brand/QuantitySelector";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id,
    name: "Lemon Haze Premium",
    category: "Flor Sativa",
    price: 60000,
    thc: 22,
    cbd: 2,
    weight: 3.5,
    description: "Una variedad sativa energizante con un perfil de terpenos cítricos. Perfecta para la creatividad y actividades diurnas. Cultivada orgánicamente en la región antioqueña.",
    imageUrl: "/placeholder.png",
    rating: 4.8,
    reviews: 124
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Product Image Header */}
      <div className="relative h-80 w-full bg-surface-2">
        <div className="absolute inset-0 bg-[image:var(--gradient-space)] mix-blend-screen opacity-50" />
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        
        {/* Top actions */}
        <div className="absolute left-4 right-4 top-safe pt-4 flex justify-between">
          <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/80 text-foreground backdrop-blur-md">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/80 text-foreground backdrop-blur-md">
              <Share2 size={20} />
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/80 backdrop-blur-md transition-colors"
            >
              <Heart size={20} className={isFavorite ? "fill-psy text-psy" : "text-foreground"} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-psy">{product.category}</p>
            <h1 className="mt-1 font-graffiti text-3xl text-foreground text-glow">{product.name}</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-lime">${product.price.toLocaleString("es-CO")}</span>
            <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
              <Star size={14} className="fill-yellow-500" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews})</span>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-6 flex gap-4">
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-surface p-3 border border-slime/20">
            <span className="text-xs text-muted-foreground">THC</span>
            <span className="text-lg font-bold text-foreground">{product.thc}%</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-surface p-3 border border-slime/20">
            <span className="text-xs text-muted-foreground">CBD</span>
            <span className="text-lg font-bold text-foreground">{product.cbd}%</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-surface p-3 border border-slime/20">
            <span className="text-xs text-muted-foreground">Peso</span>
            <span className="text-lg font-bold text-foreground">{product.weight}g</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3 className="mb-2 text-lg font-bold text-foreground">Descripción</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Legal Warning */}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-surface-2 p-4 text-xs text-muted-foreground border border-border">
          <Info size={16} className="shrink-0 text-yellow-500 mt-0.5" />
          <p>Producto regulado exclusivo para mayores de edad. El consumo responsable es tu responsabilidad.</p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-surface/90 pb-safe pt-4 backdrop-blur-md px-4 pb-6">
        <div className="flex items-center gap-4">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <NeonButton className="flex-1" size="lg" onClick={() => {}}>
            Añadir al carrito
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
