import { createElement, type ReactElement } from "react"
import {
  renderToBuffer,
  type DocumentProps,
} from "@react-pdf/renderer"
import { PropertyPdfDocument } from "@/components/pdf/property-pdf-document"
import { siteConfig } from "@/config/site"
import { getProperty } from "@/content/properties"
import {
  pdfResponse,
  propertyPdfFilename,
} from "@/lib/property-pdf"

export const runtime = "nodejs"

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params
  const property = getProperty(slug)

  if (!property) {
    return Response.json(
      { error: "Alojamiento no encontrado" },
      { status: 404 },
    )
  }

  const document = createElement(PropertyPdfDocument, {
    property,
    siteUrl: siteConfig.siteUrl,
  }) as unknown as ReactElement<DocumentProps>
  const buffer = await renderToBuffer(document)

  return pdfResponse(
    new Uint8Array(buffer),
    propertyPdfFilename(property),
  )
}
