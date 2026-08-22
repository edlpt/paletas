import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({
  id,
  name,
  category,
  price,
  imageUrl,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, detail: category, price, imageUrl });
    toast.success(`${name} agregado al carrito`, {
      style: { background: "var(--surface)", border: "1px solid var(--lime)", color: "white" }
    });
  };

  return (
    <Link
      to={`/product/${id}`}
      className="press group relative flex flex-col overflow-hidden rounded-[2rem] bg-surface p-4 shadow-card border border-slime/20"
    >
      <div className="absolute inset-0 bg-[image:var(--gradient-space)] opacity-10" />
      
      {/* Product Image */}
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-2xl bg-surface-2 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full p-2 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="relative z-10 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-foreground leading-tight">{name}</h3>
        <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
          {category} 
          {category.includes("THC") && <img src="/76_check_green.png" className="w-3 h-3" alt="Verificado" />}
        </p>
        
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-lime">
            ${price.toLocaleString("es-CO")}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-[image:var(--gradient-slime)] text-black shadow-glow"
          >
            <img src="/25_icon_plus.png" className="w-4 h-4 opacity-80 mix-blend-multiply" alt="Add" />
          </button>
        </div>
      </div>
    </Link>
  );
}
