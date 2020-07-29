<template>
  <div id="Dados">
    <q-list separator >
      <q-item v-for="(dado, index) in Lista" :key="dado.key" :style='colorLine(index, dado)'>
        <q-item-section class="dados row wrap">
          <div class="itens" v-for="f in table.fields" :key="f.key">
            <label><b>{{f.label}}</b></label>
            <label for="">{{Campos(f, dado[f.field])}}</label>
          </div>
        </q-item-section>
        <q-item-section side class="buttons">
          <q-btn icon='far fa-images' flat :style='colorLine(index, dado)' round color='green' @click='imagens(dado)' v-if="validaBtnImages(dado) && table.btnImage">
            <q-tooltip content-style="font-size: 12px">
              Imagens
            </q-tooltip>
          </q-btn>
          <q-btn icon='far fa-edit' flat :style='colorLine(index, dado)' round color='green' @click='editar(dado)' v-if="validaBtnEdit(dado)">
            <q-tooltip content-style="font-size: 12px">
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn icon='far fa-trash-alt' flat :style='colorLine(index, dado)' round color='red' @click='remover(dado)'>
            <q-tooltip content-style="font-size: 12px">
              Excluir
            </q-tooltip>
          </q-btn>
          <q-btn icon='fas fa-ellipsis-v' flat :style='colorLine(index, dado)' round color='grey' v-if="table.buttons && table.buttons.length >= 1">
            <q-tooltip content-style="font-size: 12px">
              Mais
            </q-tooltip>
            <q-menu>
              <q-list>
                <q-item  v-for="sub in table.buttons" :key="sub.key" >
                  <q-item-section  v-if='ValidarButton(sub, dado) && ValidaRestricaoMenu(sub.restricao)'>
                    <q-btn :icon='sub.icon' @click='AcaoClickButton(sub.click, dado)' :label='sub.label' flat :color='sub.color'/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import Table from '@domain/table'
export default {
  components: {
  },
  props: {
    value: {
      required: true,
    },
    Lista: {
      required: true
    },
    images: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    table: new Table()
  }),
  mounted () {
    this.table = this.value
    this.table.acaoRemover = false
  },
  computed: {
    MenuActive () {
      // var menus = this.$store.state.assistme.menus
      // var menu = menus.find(x => x.nomeRouter === this.$route.name)
      // var sub = null
      // if (!menu) {
      //   menus.forEach(m => {
      //     var atual = m.submenus.find(s => s.nomeRouter === this.$route.name)
      //     if (atual) {
      //       sub = atual
      //     }
      //   })
      //   return sub
      // }
      // return menu
    }
  },
  methods: {
    colorFilter (dado) {
      if (this.table.filterStatus) {
        var style = this.table.filterStatus(dado)
        if (style) {
          return { background: `${style.background} !important`, color: `${style.color} !important` }
        }
      }
    },
    colorLine (index, dado) {
      if (this.table.filterStatus) {
        return this.colorFilter(dado)
      }
      var total = index % 2
      if (total === 0) return { background: '#fff' }
      return { background: '#eee' }
    },
    validaBtnImages (dado) {
      if (this.table.btnImages) {
        return this.table.btnImages(dado)
      }
      return true
    },
    validaBtnEdit (dado) {
      if (this.table.btnEdit) {
        return this.table.btnEdit(dado)
      }
      return true
    },
    ValidaRestricaoMenu (acao) {
      // if (!acao) return true
      // if (this.MenuActive.permissoes.find(x => x === acao)) return true
      // return false
    },
    AcaoClickButton (click, value) {
      this.table.clickpersonalizado = click
      this.table.selecionado = value
    },
    ValidarButton (btn, dado) {
      if (btn.validate) {
        return btn.validate(dado)
      }
      return true
    },
    imagens (value) {
      this.table.selecionado = value
      this.table.acaoClick = true
      this.table.dadosImagens = true
    },
    editar (value) {
      this.table.selecionado = value
      this.table.acaoClick = true
    },
    remover (value) {
      this.Confirmacao(value)
    },
    Campos (campo, value) {
      var result = value
      if (campo.format) {
        result = campo.format(value)
      }
      if (campo.statusfiter) {
        var status = this.$status.filterStatus(value)
        if (status) {
          result = status.name
        }
      }
      return result
    },
    Excluir () {
      this.$q.loading.show()
      this.table.reflesh = false
      // console.log(this.table.selecionados[0].id)
      this.$store.dispatch('Delete', { endereco: `${this.table.controller}/${this.table.selecionados[0].id}`, data: this.table.selecionados })
        .then(resp => {
          this.table.selecionado = {}
          this.table.selecionados = []
          this.$q.loading.hide()
          this.$q.notify({
            message: resp.message,
            color: 'negative'
          })
          if (resp.success) {
            this.table.reflesh = true
          }
        })
    },
    Confirmacao (value) {
      this.$q.dialog({
        title: 'Atenção',
        message: 'Tem certeza que deseja remover o(s) dado(s) selecionado(s)',
        cancel: true,
        persistent: true,
        color: 'red',
        position: 'left'
      }).onOk(() => {
        this.table.selecionados.push(value)
        this.Excluir()
      }).onCancel(() => {
        this.table.selecionado = {}
      })
    }
  },
  watch: {
    value () {
      this.table = this.value
    },
    table () {
      this.$emit('input', this.table)
    }
  }
}
</script>
<style lang="stylus" scoped>
#Dados
  background: #fff
  .q-list
    border-top: 1px solid #ddd
    .dados
      width 100%
      display flex
      flex-direction: row;
      justify-content: flex-start;
      .itens
        text-align: left;
        min-width: 250px
        display flex
        justify-content: flex-start;
        align-items: flex-start
        flex-direction: column;
        padding 5px
        word-wrap: break-word !important
        white-space: pre !important
        overflow: hidden;
        label
          display flex
          justify-content: flex-start;
          align-items: flex-start
          width 100%
          b
            width 100%
    .buttons
      display flex
      flex-direction: row;
      max-width: 190px
      width 100%
      align-items: center
      justify-content: center
      border-left: 1px solid #ddd
      button
        font-size 11px
        padding 5px

@media (max-width:620px)
  #Dados
    background: #fff
    .q-list
      .buttons
        flex-direction: column;
        max-width: 80px
</style>
