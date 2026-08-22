import { Link } from "@tanstack/react-router";
import { art } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function CategoryBubble({
  slug,
  name,
  iconKey,
  active = false,
}: {
  slug: string;
  name: string;
  iconKey?: string | null;
  active?: boolean;
}) {
  return (
    <Link
      to="/explorar"
      search={{ cat: slug }}
      className="press flex w-[74px] shrink-0 flex-col items-center gap-2"
    >
      <span
        className={cn(
          "grid size-[58px] place-items-center rounded-full border bg-[radial-gradient(circle_at_30%_20%,var(--psy-deep),var(--surface))] p-2",
          active
            ? "border-slime shadow-[0_0_20px_-4px_var(--slime)]"
            : "border-slime/25 shadow-[0_0_18px_-10px_var(--slime)]",
        )}
      >
        <img
          src={art(iconKey)}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          className="size-full object-contain"
        />
      </span>
      <span className="text-center text-[11px] leading-tight text-muted-foreground">{name}</span>
    </Link>
  );
}
