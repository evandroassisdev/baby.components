<template>
  <q-dialog v-model="modal" persistent :maximized='full' transition-hide="flip-up" @keyup.esc='Fechar()'>
    <q-card>
      <form @submit.prevent='Salvar()'>
        <q-bar>
          <div class="cursor-pointer">{{titulo}}</div>
          <q-space />
          <q-btn dense flat icon="close" @click='modal = false' />
        </q-bar>
        <q-card-section class="container-page scroll" style="max-height: 85%">
          <div class="row">
            <slot>
            </slot>
          </div>
        </q-card-section>
        <q-separator v-if="!noButtons && !noClose"/>
        <q-card-actions class="actions" v-if="!noButtons && !noClose">
          <q-btn icon='close' label='Cancelar'  v-close-popup flat></q-btn>
          <q-btn icon='save' label='Salvar' flat  type='submit'></q-btn>
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    titulo: {
      default: null
    },
    maximized: {
      default: false,
      type: Boolean
    },
    noButtons: {
      type: Boolean,
      default: false
    },
    noClose: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    modal: false
  }),
  mounted () {
    this.modal = this.value
  },
  methods: {
    Salvar () {
      this.$emit('submit', true)
    },
    Fechar () {
      if (!this.noClose) {
        this.modal = false
      }
    }
  },
  computed: {
    full () {
      if (this.maximized) return true
      else if (this.$q.screen.width <= 760) return true
      else return false
    }
  },
  watch: {
    value () {
      this.modal = this.value
    },
    modal () {
      this.$emit('input', this.modal)
    }
  }
}
</script>
<style lang="stylus" scoped>
.q-card
  width 100% !important
  padding-bottom: 10px
  min-width 1024px !important
  form
    width 100%
  .q-bar
    background: $colorPadrao
    color #fff
  .actions
    display flex
    justify-content: flex-end
    align-items: center
    padding 5px
    width 100%
    button
      min-width 120px !important
      border 1px solid $colorPadrao
      color $colorPadrao
      padding 10px
@media (max-width: 1032px)
  .q-card
    min-width 200px !important
</style>
