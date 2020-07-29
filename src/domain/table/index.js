var mes = ('0' + (new Date().getMonth() + 1)).slice(-2)
var data = new Date(new Date().getFullYear(), new Date().getMonth(), '01')
var datafim = new Date()
datafim.setMonth(mes)
datafim.setDate(1)

export default class Table {
  constructor (
    controller = null,
    reflesh = false,
    filters = {
      dataInicial: data,
      dataFinal: datafim,
      pesquisa: null,
      executar: false,
      expert: false,
      method: 'Post',
      controller: null,
      model: {}
    },
    pk = 'id',
    selecionado = {},
    selecionados = [],
    novo = true,
    editar = true,
    btnEdit = null,
    btnImages = null,
    btnImage = false,
    excluir = true,
    excluirTodos = true,
    clickpersonalizado = null,
    fields = [],
    buttons = [],
    acaoClick = false,
    dadosImagens = false,
    acaoRemover = false
  ) {
    this.controller = controller
    this.reflesh = reflesh
    this.filters = filters
    this.pk = pk
    this.selecionado = selecionado
    this.selecionados = selecionados
    this.novo = novo
    this.editar = editar
    this.btnImage = btnImage
    this.excluir = excluir
    this.excluirTodos = excluirTodos
    this.clickpersonalizado = clickpersonalizado
    this.fields = fields
    this.buttons = []
    this.acaoClick = acaoClick
    this.dadosImagens = dadosImagens
  }
}
