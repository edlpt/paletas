import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
}) {
  const btn =
    size === "sm"
      ? "size-7 rounded-lg"
      : "size-10 rounded-xl";
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 rounded-2xl bg-surface-2 p-1",
        size === "sm" ? "w-[104px]" : "w-full",
      )}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        onClick={() => onChange(Math.max(1, value - 1))}
        className={cn("press grid place-items-center bg-surface text-slime", btn)}
      >
        <Minus className="size-4" />
      </button>
      <span className={cn("font-semibold", size === "sm" ? "text-sm" : "text-base")}>{value}</span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => onChange(value + 1)}
        className={cn("press grid place-items-center bg-surface text-slime", btn)}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
