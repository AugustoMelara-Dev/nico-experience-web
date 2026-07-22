"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronDown, House, MapPin, Menu } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import ThemeSwitcher from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { businessConfig } from "@/config/business"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Alojamientos", href: "/alojamientos" },
  { name: "Preguntas", href: "/#preguntas" },
  { name: "Contacto", href: "/contacto" },
]

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled && "border-border/60 bg-background/82 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm">
              <SheetHeader className="border-b p-6">
                <BrandLogo compact />
                <SheetTitle className="sr-only">
                  Navegación principal
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Enlaces principales de Nico Experience
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 flex-col p-4">
                <div className="grid gap-1" aria-label="Navegación móvil">
                  {menuItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t pt-5">
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/alojamientos/casa-palac">
                      <House data-icon="inline-start" />
                      Casa Palac
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link
                      href={businessConfig.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin data-icon="inline-start" />
                      Ubicación del negocio
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" aria-label="Nico Experience, inicio">
          <BrandLogo compact priority />
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/#servicios">Servicios</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/alojamientos">Alojamientos</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/#preguntas">Preguntas</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Explorar
                <ChevronDown data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/alojamientos/casa-palac" className="items-start">
                    <House className="mt-0.5 size-4" aria-hidden="true" />
                    <div>
                      <div className="font-semibold">Casa Palac</div>
                      <div className="text-sm text-muted-foreground">
                        Una casa ubicada frente a la playa.
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={businessConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="items-start"
                  >
                    <MapPin className="mt-0.5 size-4" aria-hidden="true" />
                    <div>
                      <div className="font-semibold">
                        Ubicación de Nico Experience
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {businessConfig.locationLabel}
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <Link href="/contacto">Contacto</Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}
