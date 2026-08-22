import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { NeonButton } from "@/components/brand/NeonButton";
import { useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch product based on ID, fallback to Gelato if not found
  const product = useMemo(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) return found;
    return MOCK_PRODUCTS[1]; // default to Gelato
  }, [id]);

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
      {/* A lighter gradient that blends nicely with neon green */}
      <div className="relative w-full rounded-b-[40px] bg-gradient-to-br from-lime/20 via-[#1A3320] to-[#121212] pt-safe pb-20 overflow-hidden border-b border-lime/10 shadow-glow-sm">
        
        {/* Header Navigation */}
        <div className="relative z-20 flex items-center justify-between p-5">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-start text-white active:scale-95 transition-transform outline-none focus:outline-none focus:ring-0"
          >
            <span className="text-3xl font-bold">&lt;</span>
          </Link>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex h-10 w-10 items-center justify-center active:scale-95 transition-transform outline-none focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-all duration-300 drop-shadow-[0_0_8px_var(--lime)]", isFavorite ? "text-lime scale-110" : "text-white hover:text-lime")}>
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <button 
              onClick={() => navigate({ to: "/cart" })} 
              className="relative flex h-10 w-10 items-center justify-center active:scale-95 transition-transform outline-none focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-lime drop-shadow-[0_0_8px_var(--lime)]">
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
          </div>
        </div>

        {/* Product Info (Right aligned) */}
        <div className="relative z-20 flex flex-col items-end px-6 mt-2 text-right">
          <h1 className="text-3xl font-bold text-white max-w-[60%] leading-tight drop-shadow-md">
            {product.name}
          </h1>
          
          {/* Stars */}
          <div className="flex items-center justify-end gap-1 mt-2 mb-6 w-full">
            {[...Array(5)].map((_, i) => (
              <img key={i} src="/64_yellow_star.png" alt="Star" className="w-3 h-3 drop-shadow-sm" />
            ))}
          </div>

          {/* Tipo & Familia */}
          <div className="flex items-center justify-end gap-4 mb-6">
            <div className="flex flex-col items-start border-l border-white/30 pl-3">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Tipo</span>
              <span className="text-sm font-bold text-white">{product.category}</span>
            </div>
            <div className="flex flex-col items-start border-l border-white/30 pl-3">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Familia</span>
              <span className="text-sm font-bold text-white">{product.family}</span>
            </div>
            <span className="text-2xl text-white font-light ml-1">)</span>
          </div>

          {/* Precio */}
          <div className="flex items-center justify-end gap-3 mb-3">
            <span className="text-lg text-white/80 font-light">Precio</span>
            <span className="text-3xl font-bold text-white drop-shadow-md">${product.price.toLocaleString("es-CO")}</span>
          </div>

          {/* Contenido info where the old +/- was */}
          <div className="flex justify-end mb-4">
             <div className="flex items-center gap-2 rounded-full bg-black/30 backdrop-blur px-4 py-1.5 border border-white/10">
               <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Contenido</span>
               <span className="text-sm font-bold text-lime">{product.weight} {product.weight === 1 ? 'gramo' : 'gramos'}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Overlapping Image */}
      <div className="absolute top-[18vh] left-[-15%] w-[75%] max-w-[320px] z-30 pointer-events-none">
        {/* Fake shadow for performance instead of CSS drop-shadow on alpha mask */}
        <div className="absolute top-[10%] left-[10%] w-[90%] h-[90%] bg-black/80 blur-2xl rounded-full rotate-12 scale-125 pointer-events-none" />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-contain relative z-10 rotate-12 scale-125"
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
          <div className="w-1.5 h-1.5 rounded-full border border-lime shadow-[0_0_5px_var(--lime)] bg-lime/20"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
        </div>

        {/* Description */}
        <div className="w-full border-t border-white/10 pt-6 mt-4">
          <p className="text-sm leading-relaxed text-muted-foreground text-left pl-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface p-5 pb-safe z-50 border-t border-border flex items-center gap-4">
        
        {/* Quantity Selector */}
        <div className="flex items-center gap-5 rounded-full bg-surface-2 px-5 h-14 border border-white/5 shadow-inner">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center opacity-80 hover:opacity-100 active:scale-95 transition-all outline-none focus:outline-none">
            <img src="/26_icon_minus.png" className="w-4 h-4" alt="-" />
          </button>
          <span className="text-lg font-bold text-foreground w-4 text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="flex h-10 w-10 items-center justify-center opacity-80 hover:opacity-100 active:scale-95 transition-all outline-none focus:outline-none">
            <img src="/25_icon_plus.png" className="w-4 h-4" alt="+" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <NeonButton 
          size="lg" 
          onClick={handleAddToCart}
          className="flex-1 h-14 text-[16px] font-bold bg-lime text-black border-none shadow-[0_0_15px_rgba(163,230,53,0.4)] rounded-full tracking-normal"
        >
          Agregar al Carrito
        </NeonButton>

      </div>
    </div>
  );
}
