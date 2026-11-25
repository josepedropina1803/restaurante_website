import { Check, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getLanguage, LANGUAGES } from '@/lib/languages'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const atual = getLanguage(i18n.language)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={atual.name}
          className="h-auto gap-2 rounded px-4 py-2 text-base font-medium hover:bg-yellow-600"
        >
          <span className="text-xl" aria-hidden="true">
            {atual.flag}
          </span>
          <span>{atual.shortName}</span>
          <ChevronDown className="size-4 transition-transform group-aria-expanded/button:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white p-0 shadow-xl">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => void i18n.changeLanguage(lang.code)}
            className="gap-3 rounded-none px-4 py-3 text-base font-medium text-dark-brown focus:bg-cream data-[current=true]:bg-gold/10"
            data-current={lang.code === atual.code}
          >
            <span className="text-2xl" aria-hidden="true">
              {lang.flag}
            </span>
            <span>{lang.name}</span>
            {lang.code === atual.code && <Check className="ml-auto text-gold" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
