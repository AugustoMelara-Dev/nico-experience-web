import Faq from "@/components/faq"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Partners from "@/components/partners"
import Pricing from "@/components/pricing"
import ServiceCards from "@/components/service-cards"

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Partners />
      <ServiceCards />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  )
}
