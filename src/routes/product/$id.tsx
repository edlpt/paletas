import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for UI
  const product = {
    id,
    name: "Lemon Haze",
    category: "Sativa",
    family: "Premium",
    price: 60000,
    thc: 22,
    cbd: 2,
    weight: 1,
    imageUrl: "/Flower-Gelato.png",
    description: "Aroma cítrico, efecto creativo y energía mental. Cultivada orgánicamente en la región antioqueña.",
  };

  const cartItemCount = items.length;

  const handleAddToCart = () => {
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
    <div className="flex min-h-screen flex-col bg-background pb-32 overflow-x-hidden relative">
      
      {/* Top Background Area */}
      <div className="relative w-full rounded-b-[40px] bg-gradient-to-br from-[#6b21a8] to-[#14532d] pt-safe pb-20 overflow-hidden">
        {/* Subtle dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Decorative Wavy Lines (Mocked via gradient/opacity) */}
        <div className="absolute top-20 left-0 w-full h-32 opacity-20 flex flex-col gap-4">
           <div className="w-full h-4 bg-white/20 rounded-full blur-[2px] transform -rotate-3 scale-110" />
           <div className="w-full h-4 bg-white/20 rounded-full blur-[2px] transform rotate-2 scale-110 translate-x-4" />
        </div>
        
        {/* Header Navigation */}
        <div className="relative z-20 flex items-center justify-between p-5">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex h-10 w-10 items-center justify-start text-white active:scale-95 transition-transform"
          >
            <span className="text-3xl font-bold">&lt;</span>
          </button>
          
          <button 
            onClick={() => navigate({ to: "/cart" })} 
            className="relative flex h-10 w-10 items-center justify-end active:scale-95 transition-transform"
          >
            <img src="/22_icon_bag.png" alt="Cart" className="w-6 h-6 invert" />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-[-2px] flex h-2.5 w-2.5 rounded-full bg-red-500 border border-white" />
            )}
          </button>
        </div>

        {/* Product Info (Right aligned) */}
        <div className="relative z-20 flex flex-col items-end px-6 mt-2 text-right">
          <h1 className="text-3xl font-bold text-white max-w-[65%] leading-tight drop-shadow-md">
            {product.name}
          </h1>
          
          {/* Stars */}
          <div className="flex items-center justify-end gap-1 mt-2 mb-6 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src="/64_yellow_star.png" alt="Star" className="w-3 h-3 drop-shadow-sm" />
            ))}
          </div>

          {/* Type & Family */}
          <div className="flex items-center justify-end gap-4 mb-6">
            <div className="flex flex-col items-start border-l border-white/30 pl-3">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Type</span>
              <span className="text-sm font-bold text-white">{product.category}</span>
            </div>
            <div className="flex flex-col items-start border-l border-white/30 pl-3">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Family</span>
              <span className="text-sm font-bold text-white">{product.family}</span>
            </div>
            <span className="text-2xl text-white font-light ml-1">)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-end gap-3 mb-8">
            <span className="text-lg text-white/80 font-light">Price</span>
            <span className="text-3xl font-bold text-white drop-shadow-md">${product.price.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      {/* Overlapping Image */}
      {/* Positioned absolutely so it breaks out of the gradient background */}
      <div className="absolute top-[18vh] left-[-15%] w-[75%] max-w-[320px] z-30 pointer-events-none">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-contain drop-shadow-[20px_20px_30px_rgba(0,0,0,0.8)] rotate-12 scale-125"
        />
      </div>

      {/* Content Area (Bottom Section) */}
      <div className="flex-1 px-6 pt-16 relative z-10 w-full flex flex-col items-end">
        {/* Progress Bars for Stats (Right aligned layout to avoid image) */}
        <div className="flex flex-col gap-5 w-[60%] mb-10 z-20">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground w-12 text-left uppercase tracking-wider">THC</span>
            <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden border border-white/5 relative">
              <div className="absolute top-0 left-0 h-full bg-lime rounded-full shadow-[0_0_8px_var(--lime)]" style={{ width: `${Math.min(100, product.thc * 3)}%` }} />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground w-12 text-left uppercase tracking-wider">CBD</span>
            <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden border border-white/5 relative">
              <div className="absolute top-0 left-0 h-full bg-lime rounded-full shadow-[0_0_8px_var(--lime)]" style={{ width: `${Math.min(100, product.cbd * 10)}%` }} />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground w-12 text-left uppercase tracking-wider">Peso</span>
            <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden border border-white/5 relative">
              <div className="absolute top-0 left-0 h-full bg-lime rounded-full shadow-[0_0_8px_var(--lime)]" style={{ width: `${Math.min(100, product.weight * 20)}%` }} />
            </div>
          </div>
        </div>

        {/* Pagination Dots (Left aligned under image space) */}
        <div className="absolute bottom-40 left-10 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full border border-muted-foreground"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-foreground"></div>
          <div className="w-1.5 h-1.5 rounded-full border border-muted-foreground"></div>
        </div>

        {/* Description */}
        <div className="w-full border-t border-white/10 pt-6 mt-4">
          <p className="text-sm leading-relaxed text-muted-foreground text-left pl-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-background p-5 pb-safe z-50">
        
        {/* Quantity Selector - Minimalist */}
        <div className="flex justify-center mb-4">
           <div className="flex items-center gap-6 rounded-full bg-surface-2 px-4 py-1.5 border border-white/5 shadow-md">
             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-8 w-8 items-center justify-center opacity-70 active:scale-95 transition-transform">
               <img src="/26_icon_minus.png" className="w-3 h-3" alt="-" />
             </button>
             <span className="text-sm font-bold text-foreground w-6 text-center">{quantity}</span>
             <button onClick={() => setQuantity(quantity + 1)} className="flex h-8 w-8 items-center justify-center opacity-70 active:scale-95 transition-transform">
               <img src="/25_icon_plus.png" className="w-3 h-3" alt="+" />
             </button>
           </div>
        </div>

        <div className="flex items-center gap-3">
          <NeonButton 
            size="lg" 
            onClick={handleAddToCart}
            className="flex-1 h-14 text-sm font-bold bg-lime text-black border-none shadow-[0_0_15px_rgba(163,230,53,0.3)] rounded-2xl"
          >
            <div className="flex items-center justify-center gap-2">
              <img src="/22_icon_bag.png" className="w-4 h-4" alt="Cart" />
              <span>Add To Bag</span>
            </div>
          </NeonButton>
          
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "flex h-14 items-center justify-center rounded-2xl px-4 font-bold transition-all w-[130px]",
              isFavorite 
                ? "bg-red-500/20 text-red-500 border border-red-500/30" 
                : "bg-surface-2 text-muted-foreground border border-white/5"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <img src={isFavorite ? "/27_icon_heart_filled.png" : "/28_icon_heart_outline.png"} alt="Fav" className="w-5 h-5 opacity-80" />
              <span className="text-xs">Wishlist</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
