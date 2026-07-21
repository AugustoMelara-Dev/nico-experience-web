"use client"

import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { getProperty } from "@/content/properties"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  const property = getProperty("casa-palac")!

  return (
    <div className="relative justify-center items-center">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <span className="w-fit h-full text-sm bg-card px-2 py-1 border border-border rounded-full">
            Hospedajes para disfrutar Honduras
          </span>
          <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">
            Encuentra tu próxima estadía con Nico Experience
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance">
            Descubre alojamientos para descansar, compartir y disfrutar momentos especiales frente al mar.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <Button asChild className="shadow-lg">
              <Link href="/alojamientos">Ver alojamientos</Link>
            </Button>
            <WhatsAppLink message={property.whatsappMessage} variant="outline" />
          </motion.div>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-150 bg-light blur-[70px] rounded-3xl max-sm:rotate-15 sm:rotate-35 will-change-transform" />
        </div>
      </motion.div>
    </div>
  )
}
