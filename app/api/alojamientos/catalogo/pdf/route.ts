import { createElement, type ReactElement } from "react"
import {
  renderToBuffer,
  type DocumentProps,
} from "@react-pdf/renderer"
import { CatalogPdfDocument } from "@/components/pdf/catalog-pdf-document"
import { siteConfig } from "@/config/site"
import { activeProperties } from "@/content/properties"
import {
  catalogPdfFilename,
  pdfResponse,
} from "@/lib/property-pdf"

export const runtime = "nodejs"

export async function GET() {
  const document = createElement(CatalogPdfDocument, {
    properties: activeProperties,
    siteUrl: siteConfig.siteUrl,
  }) as unknown as ReactElement<DocumentProps>
  const buffer = await renderToBuffer(document)

  return pdfResponse(new Uint8Array(buffer), catalogPdfFilename())
}
