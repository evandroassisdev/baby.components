<template>
  <div id="header">
    <h1>{{titulo}}</h1>
    <q-space/>
    <q-btn label='Novo' icon='add' flat @click='table.acaoClick = true' v-if="table.novo"></q-btn>
  </div>
</template>
<script>
import Table from '@domain/table'
export default {
  props: {
    value: {
      required: true
    },
    titulo: {
      required: false
    }
  },
  data: () => ({
    table: new Table()
  }),
  mounted () {
    this.table = this.value
  },
  methods: {
    ValidaRestricaoMenu (permissoes) {
      if (!permissoes) return true
      if (this.MenuActive.permissoes.find(x => x === permissoes)) return true
      return false
    }
  },
  computed: {
    MenuActive () {
      var menus = this.$store.state.assistme.menus
      var menu = menus.find(x => x.nomeRouter === this.$route.name)
      var sub = null
      if (!menu) {
        menus.forEach(m => {
          var atual = m.submenus.find(s => s.nomeRouter === this.$route.name)
          if (atual) {
            sub = atual
          }
        })
        return sub
      }
      return menu
    }
  },
  watch: {
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
#header
  border-bottom: 1px solid #eee
  display flex
  justify-content: flex-start;
  align-items: center;
  button
    background: $colorPadrao
    color #fff
    padding 10px
  h1
    font-size 18px
    line-height: normal;
    font-weight: bold
    color #5f5f5f
    padding 10px
</style>
