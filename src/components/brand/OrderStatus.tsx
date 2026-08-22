import { cn } from "@/lib/utils";

export const STATUS_LABEL: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  ready: "Disponible",
  in_transit: "En camino",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-surface-2 text-muted-foreground",
  confirmed: "bg-slime/15 text-slime",
  preparing: "bg-warning/15 text-warning",
  ready: "bg-slime/15 text-slime",
  in_transit: "bg-warning/15 text-warning",
  delivered: "bg-psy/20 text-[color:var(--slime)]",
  cancelled: "bg-destructive/15 text-destructive",
};

export function OrderStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        STATUS_STYLE[status] ?? STATUS_STYLE.pending,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
