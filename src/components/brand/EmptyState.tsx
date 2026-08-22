import { Link } from "@tanstack/react-router";
import { ART } from "@/lib/brand";
import { NeonButton } from "./NeonButton";

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaTo = "/explorar",
  image = "alien",
}: {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
  image?: keyof typeof ART;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-8 py-14 text-center">
      <img
        src={ART[image]}
        alt=""
        width={160}
        height={160}
        loading="lazy"
        className="size-36 animate-float object-contain opacity-90"
      />
      <div>
        <h3 className="font-graffiti text-lg text-slime">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {ctaLabel ? (
        <NeonButton asChild size="sm" className="w-auto px-6">
          <Link to={ctaTo}>{ctaLabel}</Link>
        </NeonButton>
      ) : null}
    </div>
  );
}
