import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for UI - in a real app this would be fetched based on the ID
  const product = {
    id,
    name: "Lemon Haze",
    category: "Flor Sativa",
    price: 60000,
    thc: 22,
    cbd: 2,
    weight: 1,
    imageUrl: "/08_tree_flower.png",
    description: "Aroma cítrico, efecto creativo y energía mental. Cultivada orgánicamente en la región antioqueña.",
  };

  const handleAddToCart = () => {
    // Add the item multiple times if quantity > 1, 
    // since our context adds 1 by 1 and merges them
    for(let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        detail: product.category,
        price: product.price,
        imageUrl: product.imageUrl
      });
    }
    
    toast.success(`${quantity}x ${product.name} al carrito`, {
      style: { background: "var(--surface)", border: "1px solid var(--lime)", color: "white" }
    });
    
    navigate({ to: "/cart" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header / Nav */}
      <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-5 pt-safe">
        <button
          onClick={() => navigate({ to: "/" })}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/80 backdrop-blur"
        >
          <span className="text-xl font-bold">&lt;</span>
        </button>
        
        <button onClick={() => setIsFavorite(!isFavorite)} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2/80 backdrop-blur">
          <img src={isFavorite ? "/27_icon_heart_filled.png" : "/28_icon_heart_outline.png"} alt="Favorito" className="w-5 h-5" />
        </button>
      </div>

      {/* Image Area */}
      <div className="relative h-[45vh] w-full bg-background">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain drop-shadow-2xl animate-float"
          />
        </div>
        {/* Curved fade into content */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-2xl font-bold text-lime mt-1">
            ${product.price.toLocaleString("es-CO")}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-3">
          <div className="flex-1 rounded-2xl bg-surface-2 border border-white/5 p-3 text-center">
            <p className="text-xs text-muted-foreground">THC</p>
            <p className="text-base font-bold text-foreground">{product.thc}%</p>
          </div>
          <div className="flex-1 rounded-2xl bg-surface-2 border border-white/5 p-3 text-center">
            <p className="text-xs text-muted-foreground">CBD</p>
            <p className="text-base font-bold text-foreground">{product.cbd}%</p>
          </div>
          <div className="flex-1 rounded-2xl bg-surface-2 border border-white/5 p-3 text-center">
            <p className="text-xs text-muted-foreground">Peso</p>
            <p className="text-base font-bold text-foreground">{product.weight}g</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-foreground mb-2">Descripción</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-background p-5 pb-safe z-50">
        {/* Quantity Selector */}
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center gap-6 rounded-full bg-surface-2 px-4 py-2 border border-white/5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center active:scale-95 opacity-80"
            >
              <img src="/26_icon_minus.png" alt="Menos" className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
            </button>
            <span className="w-8 text-center text-lg font-bold text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center active:scale-95 opacity-80"
            >
              <img src="/25_icon_plus.png" alt="Más" className="w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        <NeonButton 
          size="lg" 
          onClick={handleAddToCart}
          className="w-full text-lg font-bold bg-lime text-black border-none py-4"
        >
          Agregar al carrito - ${(product.price * quantity).toLocaleString("es-CO")}
        </NeonButton>
      </div>
    </div>
  );
}
