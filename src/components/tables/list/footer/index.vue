<template>
  <div id="Footer">
    <p>Total de registros: {{qtde}}</p>
  </div>
</template>
<script>
import Table from '@domain/table'
export default {
  components: {
  },
  props: {
    value: {
      required: true
    },
    Lista: {
      required: true
    }
  },
  data: () => ({
    table: new Table()
  }),
  mounted () {
    this.table = this.value
  },
  computed: {
    qtde () {
      return this.Lista.length
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
#Footer
  background: #fff
  padding 10px
  text-align: center
  font-weight: bold
  border-top 1px solid #eee
  display flex
  justify-content: center
  align-items: center
</style>
