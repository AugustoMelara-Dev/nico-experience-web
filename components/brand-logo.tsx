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
        "inline-flex items-center justify-center",
        className,
      )}
    >
      <Image
        src={compact ? brandConfig.logoCompactWeb : brandConfig.logoWeb}
        alt="Nico Experience"
        width={compact ? 178 : 320}
        height={compact ? 46 : 180}
        className={cn(
          "h-auto w-auto object-contain dark:invert",
          compact
            ? "max-h-8 max-w-38 sm:max-w-44"
            : "w-full max-w-72",
        )}
        priority={priority}
      />
      <span className="sr-only">{brandConfig.descriptor}</span>
    </span>
  )
}
