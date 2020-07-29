<template>
  <div id="Search">
    <MBRInput v-model="table.filters.pesquisa" icon='search' label="Pesquisar" placeholder='pesquise aqui' class="input"/>
    <div class="buttons">
    </div>
  </div>
</template>
<script>
import Table from '@domain/table'
export default {
  props: {
    value: {
      required: true
    }
  },
  data: () => ({
    table: new Table()
  }),
  created () {
    this.table = this.value
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
#Search
  display flex
  justify-content: flex-start;
  align-items: center;
  .input
    width 100%
    padding 15px
</style>
