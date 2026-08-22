import { art } from "@/lib/brand";

export function PsychedelicBanner({
  title,
  subtitle,
  imageKey = "rocket",
}: {
  title: string;
  subtitle?: string | null;
  imageKey?: string | null;
}) {
  return (
    <div className="relative h-[112px] w-full shrink-0 overflow-hidden rounded-3xl bg-[image:var(--gradient-psy)] p-4 shadow-[0_0_34px_-16px_var(--psy)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgba(183,255,0,0.28),transparent_55%)]" />
      <div className="absolute bottom-0 left-0 h-8 w-full bg-[linear-gradient(to_top,rgba(8,10,8,0.5),transparent)]" />
      <div className="relative z-10 max-w-[60%]">
        <h3 className="font-graffiti text-lg leading-tight text-white">{title}</h3>
        {subtitle ? <p className="text-sm text-white/80">{subtitle}</p> : null}
      </div>
      <img
        src={art(imageKey, "rocket")}
        alt=""
        width={160}
        height={160}
        loading="lazy"
        className="absolute -right-2 bottom-0 z-10 size-28 animate-float object-contain"
      />
    </div>
  );
}
