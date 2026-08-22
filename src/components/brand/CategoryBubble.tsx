import { cn } from "@/lib/utils";

interface CategoryBubbleProps {
  name: string;
  iconUrl: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryBubble({ name, iconUrl, active, onClick }: CategoryBubbleProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex min-w-[80px] flex-col items-center gap-2",
        "press transition-all duration-300"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-[24px] border border-slime/20 shadow-glow transition-all duration-300",
          active ? "bg-[image:var(--gradient-slime)] opacity-100" : "bg-surface-2 opacity-60 hover:opacity-80"
        )}
      >
        <img src={iconUrl} alt={name} className="h-10 w-10 object-contain drop-shadow-md" />
      </div>
      <span
        className={cn(
          "text-xs font-semibold",
          active ? "text-lime" : "text-muted-foreground"
        )}
      >
        {name}
      </span>
    </button>
  );
}
