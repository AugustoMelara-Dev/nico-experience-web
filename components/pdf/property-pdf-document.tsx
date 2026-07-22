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
import {
  publicAssetPath,
  selectPropertyPdfImages,
} from "@/lib/property-pdf"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { pdfStyles } from "@/components/pdf/pdf-theme"

type PropertyPdfDocumentProps = {
  property: Property
  siteUrl: string
}

const absoluteUrl = (path: string, siteUrl: string) =>
  new URL(path, siteUrl).toString()

export function PropertyPdfDocument({
  property,
  siteUrl,
}: PropertyPdfDocumentProps) {
  const images = selectPropertyPdfImages(property)
  const featured = images[0]
  const canonicalUrl = absoluteUrl(`/alojamientos/${property.slug}`, siteUrl)
  const whatsappUrl = buildWhatsAppUrl(property.whatsappMessage)
  const generatedAt = new Intl.DateTimeFormat("es-HN", {
    dateStyle: "long",
  }).format(new Date())

  return (
    <Document
      title={`${property.name} | Nico Experience`}
      author="Nico Experience"
      subject={property.shortDescription}
      language="es-HN"
    >
      <Page size="A4" style={pdfStyles.page} wrap>
        <View style={pdfStyles.header} fixed>
          <Image
            src={publicAssetPath(brandConfig.logoPdf)}
            style={pdfStyles.logo}
          />
          <Text style={pdfStyles.brandText}>{brandConfig.descriptor}</Text>
        </View>

        <Text style={pdfStyles.eyebrow}>
          {property.locationLabel ?? "Alojamiento"}
        </Text>
        <Text style={pdfStyles.title}>{property.name}</Text>
        <Text style={pdfStyles.subtitle}>{property.shortDescription}</Text>

        {featured?.pdfSrc ? (
          <View style={pdfStyles.heroFrame} wrap={false}>
            <Image
              src={publicAssetPath(featured.pdfSrc)}
              style={pdfStyles.hero}
            />
          </View>
        ) : null}

        <View style={pdfStyles.section} wrap={false}>
          <Text style={pdfStyles.sectionTitle}>Conoce la propiedad</Text>
          <Text style={pdfStyles.body}>{property.description}</Text>
        </View>

        <View style={pdfStyles.section} wrap={false}>
          <Text style={pdfStyles.sectionTitle}>Características confirmadas</Text>
          <View style={pdfStyles.chipRow}>
            {property.amenities
              .filter((amenity) => amenity.confirmed)
              .map((amenity) => (
                <Text key={amenity.label} style={pdfStyles.chip}>
                  {amenity.label}
                </Text>
              ))}
          </View>
        </View>

        {property.kitchenInventory?.length ? (
          <View style={pdfStyles.section} wrap={false}>
            <Text style={pdfStyles.sectionTitle}>Cocina documentada</Text>
            <Text style={pdfStyles.body}>
              {property.kitchenInventory.join(" · ")}
            </Text>
          </View>
        ) : null}

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Una mirada a sus espacios</Text>
          <View style={pdfStyles.gallery}>
            {images.map((image) => (
              <View key={image.src} style={pdfStyles.galleryItem} wrap={false}>
                <Image
                  src={publicAssetPath(image.pdfSrc!)}
                  style={pdfStyles.galleryImage}
                />
                <View style={pdfStyles.caption}>
                  <Text style={pdfStyles.captionTitle}>{image.title}</Text>
                  {image.description ? (
                    <Text style={pdfStyles.captionText}>
                      {image.description}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={pdfStyles.contact} wrap={false}>
          <Text style={pdfStyles.sectionTitle}>Consulta con Nico Experience</Text>
          <Text style={pdfStyles.body}>
            Confirma disponibilidad, condiciones y cualquier dato pendiente
            directamente con nuestro equipo.
          </Text>
          {property.mapUrl ? (
            <Link src={property.mapUrl} style={pdfStyles.link}>
              Ver ubicación en Google Maps
            </Link>
          ) : null}
          {whatsappUrl ? (
            <Link src={whatsappUrl} style={pdfStyles.link}>
              Consultar por WhatsApp
            </Link>
          ) : null}
          <Link src={canonicalUrl} style={pdfStyles.link}>
            Ver galería completa en {canonicalUrl}
          </Link>
        </View>

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
