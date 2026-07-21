import Image from "next/image"
import { brandConfig } from "@/config/brand"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  compact?: boolean
  className?: string
  priority?: boolean
}

export function BrandLogo({
  compact = false,
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        !compact && "rounded-xl border border-border bg-white p-2",
        className,
      )}
    >
      <Image
        src={compact ? brandConfig.logoCompactWeb : brandConfig.logoWeb}
        alt="Nico Experience"
        width={compact ? 178 : 240}
        height={compact ? 46 : 135}
        className={cn(
          "h-auto w-auto object-contain",
          compact
            ? "max-h-8 max-w-38 dark:brightness-0 dark:invert sm:max-w-44"
            : "max-w-56",
        )}
        priority={priority}
      />
      <span className="sr-only">{brandConfig.descriptor}</span>
    </span>
  )
}
