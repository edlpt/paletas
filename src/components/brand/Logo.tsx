import { LOGO_URL } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 120,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <img
      src={LOGO_URL}
      alt="El De Las Paletas"
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      className={cn("select-none object-contain drop-shadow-[0_0_22px_rgba(160,255,0,0.35)]", className)}
      style={{ width: size, height: "auto" }}
    />
  );
}
