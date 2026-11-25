import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  subtitle: string
  title: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({ subtitle, title, tone = 'light' }: SectionHeadingProps) {
  return (
    <>
      <p className="mb-8 text-center text-sm tracking-widest text-gold uppercase">{subtitle}</p>
      <h2
        className={cn(
          'mb-4 text-center font-serif text-4xl md:text-5xl',
          tone === 'light' ? 'text-dark-brown' : 'text-cream',
        )}
      >
        {title}
      </h2>
    </>
  )
}
