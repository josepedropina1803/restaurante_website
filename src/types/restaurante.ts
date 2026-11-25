export interface MenuItem {
  nome: string
  descricao: string
  preco: string
}

export interface MenuCategoria {
  categoria: string
  itens: MenuItem[]
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
  horario: {
    descricao: string
  }
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
  ano: number
}
