<template>
  <div id="Table">
    <c-header v-model="table" :titulo='titulo'></c-header>
    <c-list v-model="table"></c-list>
  </div>
</template>
<script>
import CList from './list'
import CHeader from './header'
import Table from '@domain/table'
export default {
  components: {
    CHeader,
    CList
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
    table: new Table()
  }),
  created () {
    this.table = this.value
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
#Table
  margin 40px
@media (max-width: 670px)
  #Table
    margin 10px
</style>
