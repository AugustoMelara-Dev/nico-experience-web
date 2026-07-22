import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type PdfDownloadLinkProps = {
  href: string
  label: string
  className?: string
}

export function PdfDownloadLink({
  href,
  label,
  className,
}: PdfDownloadLinkProps) {
  return (
    <Button asChild variant="outline" className={className}>
      <a href={href} download>
        <Download data-icon="inline-start" aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}
