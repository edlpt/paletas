import { cn } from "@/lib/utils";

export function SlimeDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 34"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("h-8 w-full text-slime animate-drip", flip && "rotate-180", className)}
    >
      <path
        fill="currentColor"
        d="M0 0h400v10c-8 0-10 6-10 12s-4 9-8 9-7-4-7-10-3-11-11-11-9 5-9 12-4 11-9 11-8-5-8-12-4-9-9-9-8 4-8 10-4 10-9 10-9-5-9-12-4-10-10-10-9 5-9 11-4 11-9 11-8-5-8-11-4-11-10-11-10 5-10 12-4 10-9 10-8-5-8-11-4-10-10-10-9 4-9 10-4 11-9 11-9-5-9-12-4-10-10-10-9 5-9 11-4 10-9 10-8-4-8-10-4-11-11-11-9 5-9 11-4 11-9 11-8-5-8-11-4-10-10-10-9 4-9 10-4 11-9 11-9-5-9-11-4-11-10-11-9 5-9 12-4 10-9 10-8-4-8-10-4-11-11-11V0z"
      />
    </svg>
  );
}
