import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { art, money } from "@/lib/brand";
import type { Product } from "@/lib/api";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: (product: Product) => void;
}) {
  return (
    <div className="card-dark press relative overflow-hidden p-3">
      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="block"
        aria-label={product.name}
      >
        <div className="relative grid h-28 place-items-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,var(--psy-deep),transparent_70%)]">
          <img
            src={art(product.image_key)}
            alt={product.name}
            width={200}
            height={200}
            loading="lazy"
            className="size-24 object-contain drop-shadow-[0_0_18px_rgba(160,255,0,0.35)]"
          />
        </div>
        <h3 className="mt-3 truncate text-sm font-semibold">{product.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{product.subtitle}</p>
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-bold text-slime">${money(product.price)}</span>
        <button
          type="button"
          aria-label={`Agregar ${product.name} al carrito`}
          onClick={() => onAdd?.(product)}
          className="press grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-slime)] text-primary-foreground shadow-[0_0_18px_-6px_var(--slime)]"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
