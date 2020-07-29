<template>
  <div id="Search">
    {{filters}}
    <q-input v-model="filters.pesquisa" outlined color='colorPadrao'>
      <template v-slot:prepend>
        <q-icon name="fas fa-search" color='colorPadrao' @click="filters.executar = true" class="cursor-pointer" />
      </template>
      <!-- <template v-slot:append>
          <q-btn icon="fas fa-angle-down" v-if="ativeSlote" @click.native="avancado = true" round flat style='margin-right:10px'>
          </q-btn>
          <q-icon name="close" @click="filters.pesquisa = ''" class="cursor-pointer" style='margin-right:10px' />
      </template> -->
    </q-input>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: false
    }
  },
  data: () => ({
    model: null,
    filters: {}
  }),
  created () {
    this.filters = this.value
  },
  watch: {
    value () {
      this.table = this.value
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
