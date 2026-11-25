import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV_ITEMS = [
  { href: '#home', label: 'nav.home' },
  { href: '#about', label: 'nav.about' },
  { href: '#menu', label: 'nav.menu' },
  { href: '#gallery', label: 'nav.gallery' },
  { href: '#contact', label: 'nav.contact' },
] as const

interface HeaderProps {
  nome: string
}

export function Header({ nome }: HeaderProps) {
  const { t } = useTranslation()
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="fixed z-50 w-full bg-dark-brown/95 shadow-lg backdrop-blur-sm">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="font-serif text-2xl text-gold">{nome}</div>

        <div className="hidden items-center space-x-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="text-cream transition hover:text-gold">
              {t(item.label)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-cream hover:bg-transparent hover:text-gold md:hidden"
              aria-label={t('nav.openMenu')}
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            aria-describedby={undefined}
            className="border-gold/20 bg-dark-brown px-6 pt-12"
          >
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-3 right-3 text-cream hover:bg-transparent hover:text-gold"
                aria-label={t('nav.closeMenu')}
              >
                <X />
              </Button>
            </SheetClose>
            <SheetTitle className="font-serif text-2xl font-normal text-gold">{nome}</SheetTitle>
            <div className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMenuAberto(false)
                  }}
                  className="block py-2 text-cream transition hover:text-gold"
                >
                  {t(item.label)}
                </a>
              ))}
            </div>
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
