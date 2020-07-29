export default class Pessoa {
  constructor (
    id = null,
    nome = null,
    email = null,
    cpf = null,
    rg = null,
    telefone = null,
    celular = null,
    enderecos = []
  ) {
    this.id = id
    this.nome = nome
    this.email = email
    this.cpf = cpf
    this.rg = rg
    this.telefone = telefone
    this.celular = celular
    this.enderecos = enderecos
  }
}
