import Faq from "@/components/faq"
import ClosingCta from "@/components/closing-cta"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Partners from "@/components/partners"
import Pricing from "@/components/pricing"
import ServiceCards from "@/components/service-cards"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Partners />
      <ServiceCards />
      <Pricing />
      <Testimonials />
      <Faq />
      <ClosingCta />
      <Footer />
    </main>
  )
}
