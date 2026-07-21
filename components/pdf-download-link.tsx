import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type PdfDownloadLinkProps = {
  href: string
  label: string
}

export function PdfDownloadLink({ href, label }: PdfDownloadLinkProps) {
  return (
    <Button asChild variant="outline">
      <a href={href} download>
        <Download aria-hidden="true" />
        {label}
      </a>
    </Button>
  )
}
