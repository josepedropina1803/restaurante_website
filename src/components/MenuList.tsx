import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MenuCategoria } from '@/types/restaurante'

interface MenuListProps {
  categorias: MenuCategoria[]
}

export function MenuList({ categorias }: MenuListProps) {
  return (
    <div className="space-y-12">
      {categorias.map((categoria) => (
        <Card
          key={categoria.categoria}
          className="gap-0 rounded-lg bg-white p-8 shadow-lg ring-0 md:p-12"
        >
          <CardHeader className="mb-8 border-b-2 border-gold px-0 pb-4">
            <CardTitle className="text-center font-serif text-3xl font-normal text-gold">
              <h3>{categoria.categoria}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-0">
            {categoria.itens.map((item) => (
              <div
                key={item.nome}
                className="flex items-start justify-between border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="flex-1">
                  <h4 className="mb-2 font-serif text-xl text-dark-brown">{item.nome}</h4>
                  <p className="text-sm text-gray-600">{item.descricao}</p>
                </div>
                <div className="ml-4 text-lg font-semibold text-gold">{item.preco}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
