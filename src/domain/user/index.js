import Pessoa from './../pessoa'
import Servico from './../servico'

export default class Usuario {
  constructor (
    id = null,
    login = null,
    senha = null,
    accessToken = null,
    servico = new Servico(),
    pessoa = new Pessoa()
  ) {
    this.id = id
    this.login = login
    this.senha = senha
    this.accessToken = accessToken
    this.servico = servico
    this.pessoa = pessoa
  }
}
