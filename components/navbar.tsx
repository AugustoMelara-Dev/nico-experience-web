"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDownIcon, Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { House, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ThemeSwitcher from "@/components/theme-switcher"
import { BrandLogo } from "@/components/brand-logo"

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Alojamientos", href: "/alojamientos" },
  { name: "Preguntas", href: "/#preguntas" },
  { name: "Contacto", href: "/contacto" },
]

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showNavbarBlur = isScrolled || isMenuOpen

  return (
    <nav className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300 ease-out ${showNavbarBlur ? "backdrop-blur supports-backdrop-filter:bg-background/60" : "backdrop-blur-0 supports-backdrop-filter:bg-background/0"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen}>
              <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </motion.div>
            </Button>
          </div>
          <div className="flex sm:hidden">
            <Link href="/" aria-label="Nico Experience, inicio">
              <BrandLogo compact priority />
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <Link href="/" aria-label="Nico Experience, inicio">
              <BrandLogo compact priority />
            </Link>
            <Button asChild variant="ghost" size="sm"><Link href="/#servicios">Servicios</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/alojamientos">Alojamientos</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link href="/#preguntas">Preguntas</Link></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">Casa Palac<ChevronDownIcon className="ml-1 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <DropdownMenuItem asChild>
                  <Link href="/alojamientos/casa-palac" className="items-start">
                    <House className="mr-2 mt-0.5 h-4 w-4" />
                    <div>
                      <div className="font-semibold">Casa Palac</div>
                      <div className="text-sm text-muted-foreground">Una casa ubicada frente a la playa.</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="https://maps.app.goo.gl/BhDjLciEvjhp8pBN8?g_st=iw" target="_blank" rel="noopener noreferrer" className="items-start">
                    <MapPin className="mr-2 mt-0.5 h-4 w-4" />
                    <div>
                      <div className="font-semibold">Google Maps</div>
                      <div className="text-sm text-muted-foreground">Abre la ubicación proporcionada por Nico Experience.</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild className="hidden sm:flex" size="sm"><Link href="/contacto">Contacto</Link></Button>
            <ThemeSwitcher />
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="sm:hidden overflow-hidden">
              <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }} transition={{ duration: 0.3, delay: 0.1 }} className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}>
                    <Link href={item.href} className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
