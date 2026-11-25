export interface MenuItem {
  nome: string
  descricao: string
  preco: number
}

export interface MenuCategoria {
  categoria: string
  itens: MenuItem[]
}

export interface HorarioLinha {
  dias: string
  horas: string
}

export interface Imagem {
  url: string
  alt: string
}

export interface Restaurante {
  nome: string
  slogan: string
  descricao: string[]
  contacto: {
    telefone: string
    email: string
    morada: {
      rua: string
      codigoPostal: string
      cidade: string
      pais: string
    }
  }
  horario: HorarioLinha[]
  /** Deixar a string vazia para esconder o link. */
  redesSociais: {
    facebook: string
    instagram: string
    tripadvisor: string
  }
  ementa: MenuCategoria[]
  imagens: {
    hero: string
    sobre: string
    galeria: Imagem[]
  }
}
