/* eslint-disable jsx-a11y/alt-text -- React PDF Image does not expose an alt prop. */
import {
  Document,
  Image,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer"
import { brandConfig } from "@/config/brand"
import type { Property } from "@/content/properties"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import {
  publicAssetBuffer,
  selectPropertyPdfImages,
} from "@/lib/property-pdf"
import { pdfStyles } from "@/components/pdf/pdf-theme"

type CatalogPdfDocumentProps = {
  properties: Property[]
  siteUrl: string
}

export function CatalogPdfDocument({
  properties,
  siteUrl,
}: CatalogPdfDocumentProps) {
  const generatedAt = new Intl.DateTimeFormat("es-HN", {
    dateStyle: "long",
  }).format(new Date())

  return (
    <Document
      title="Catálogo de alojamientos | Nico Experience"
      author="Nico Experience"
      subject="Alojamientos activos de Nico Experience"
      language="es-HN"
    >
      <Page size="A4" style={pdfStyles.page} wrap>
        <View style={pdfStyles.header} fixed>
          <Image
            src={publicAssetBuffer(brandConfig.logoPdf)}
            style={pdfStyles.logo}
          />
          <Text style={pdfStyles.brandText}>{brandConfig.descriptor}</Text>
        </View>

        <Text style={pdfStyles.eyebrow}>Catálogo activo</Text>
        <Text style={pdfStyles.title}>Alojamientos de Nico Experience</Text>
        <Text style={pdfStyles.subtitle}>
          Fotografías reales e información confirmada para conocer cada
          alojamiento y consultar directamente con nuestro equipo.
        </Text>

        {properties.map((property) => {
          const featured = selectPropertyPdfImages(property)[0]
          const canonicalUrl = new URL(
            `/alojamientos/${property.slug}`,
            siteUrl,
          ).toString()
          const whatsappUrl = buildWhatsAppUrl(property.whatsappMessage)

          return (
            <View key={property.slug} style={pdfStyles.section} wrap={false}>
              {featured?.pdfSrc ? (
                <View style={pdfStyles.heroFrame}>
                  <Image
                    src={publicAssetBuffer(featured.pdfSrc)}
                    style={pdfStyles.hero}
                  />
                </View>
              ) : null}
              <Text style={pdfStyles.eyebrow}>
                {property.locationLabel ?? "Alojamiento"}
              </Text>
              <Text style={pdfStyles.sectionTitle}>{property.name}</Text>
              <Text style={pdfStyles.body}>{property.shortDescription}</Text>
              <View style={[pdfStyles.chipRow, { marginTop: 8 }]}>
                {property.amenities
                  .filter((amenity) => amenity.confirmed)
                  .slice(0, 6)
                  .map((amenity) => (
                    <Text key={amenity.label} style={pdfStyles.chip}>
                      {amenity.label}
                    </Text>
                  ))}
              </View>
              <Link src={canonicalUrl} style={pdfStyles.link}>
                Ver información y galería completa
              </Link>
              {whatsappUrl ? (
                <Link src={whatsappUrl} style={pdfStyles.link}>
                  Consultar por WhatsApp
                </Link>
              ) : null}
            </View>
          )
        })}

        <View style={pdfStyles.footer} fixed>
          <Text>Generado el {generatedAt}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
