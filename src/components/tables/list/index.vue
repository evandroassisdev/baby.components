<template>
  <div id="List">
    <c-search v-model="table"></c-search>
    <c-dados v-model="table" :Lista='List' />
    <c-footer v-model="table" :Lista='List'></c-footer>
  </div>
</template>
<script>
import CDados from './table'
import CFooter from './footer'
import CSearch from './search'
import Table from '@domain/table'
export default {
  components: {
    CSearch, CFooter, CDados
  },
  props: {
    value: {
      required: true
    },
    titulo: {
      required: false
    }
  },
  data: () => ({
    table: new Table(),
    registros: []
  }),
  mounted () {
    this.table = this.value
    this.carregardados()
  },
  methods: {
    Campos (campo, value) {
      if (campo.format) {
        return campo.format(value).toString()
      }
      return value.toString()
    },
    carregardados () {
      this.$store.dispatch('Get', this.table.controller)
        .then(resp => {
          this.registros = resp
          this.table.selecionado = {}
          this.table.selecionados = []
          this.table.acaoRemover = false
          this.table.acaoClick = false
        })
    }
  },
  computed: {
    List () {
      if (this.table.filters.pesquisa) {
        return this.registros.filter(item => {
          for (var n = 0; n < this.table.fields.length; n++) {
            var campo = this.table.fields[n].field
            if (item[campo]) {
              if (this.Campos(this.table.fields[n], item[campo]).toString().toLowerCase().includes(this.table.filters.pesquisa.toString().toLowerCase())) {
                return item
              }
            }
          }
        })
      }
      return this.registros
    }
  },
  watch: {
    'table.acaoClick' () {
      if (!this.table.acaoClick) {
        this.table.reflesh = true
      }
    },
    'table.reflesh' () {
      if (this.table.reflesh) {
        this.carregardados()
        this.table.selecionado = {}
        this.table.selecionados = []
        this.table.reflesh = false
        this.table.acaoClick = false
        this.table.dadosImagens = false
      }
    },
    table () {
      this.$emit('input', this.table)
    },
    value () {
      this.table = this.value
    }
  }
}
</script>
<style lang="stylus" scoped>
#List
  margin-top 20px
  border 1px solid #eee
  border-radius 10px
  background: #fff
</style>
