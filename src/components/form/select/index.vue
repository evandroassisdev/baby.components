<template>
  <div id="Select">
    <q-select v-model="model" :options='list' :label='label' :outlined="outlined" :error="isError" :rounded='round'
     :dark='dark' :color='color' :placeholder='placeholder' :standout='standout' :dense="dense" :filled='filled'
     transition-show="scale" :multiple='multiple' :stack-label='stack' :emit-value='emitValue' :map-options='emitValue'
        transition-hide="scale" :option-value="campo" :use-input='nosearch'>
       <template v-slot:append>
         <q-avatar v-if='avatar'>
           <img :src="icon" alt="">
         </q-avatar>
         <q-icon :name='icon' v-if="icon"></q-icon>
         <q-btn icon='add' v-if="addnovo" round color='colorPadrao' @click='adicionar = true' style='width: 100%'>
           <q-tooltip content-style="font-size: 16px">
             adicionar novo
           </q-tooltip>
         </q-btn>
         <q-icon name="close" v-if='close' @click="model = null" class="cursor-pointer" />
       </template>
      <template v-slot:option="scope">
         <q-item
           v-bind="scope.itemProps"
           v-on="scope.itemEvents"
         >
           <q-item-section avatar v-if="scope.opt.avatar">
             <q-avatar >
               <img :src="scope.opt.avatar" alt="" v-if="scope.opt.avatar">
               <q-icon :name='scope.opt.icon'></q-icon>
             </q-avatar>
           </q-item-section>
           <q-item-section>
             <q-item-label v-html="scope.opt.label" />
           </q-item-section>
         </q-item>
       </template>
       <template v-slot:error>
         {{error}}
       </template>
       <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            nenhum registro encontrado
          </q-item-section>
        </q-item>
      </template>
     </q-select>
     <div v-if="adicionar">
        <slot name='addnovo'></slot>
     </div>
  </div>
</template>
<script>
export default {
  props: {
    titulo: {
      default: null
    },
    addnovo: {
      type: Boolean,
      default: false
    },
    nosearch: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    error: {
      default: null
    },
    stack: {
      default: false
    },
    round: {
      default: false
    },
    controllerLabel: {
      default: 'nome'
    },
    controllerValue: {
      default: null
    },
    avatarOption: {
      default: null
    },
    value: {
      required: true
    },
    campo: {
      default: 'value'
    },
    adicionar: {
      required: false,
      default: false
    },
    options: {
      required: false,
      default: null
    },
    emitValue: {
      type: Boolean,
      default: false
    },
    dark: {
      default: false
    },
    uniq: {
      default: false,
      type: Boolean
    },
    close: {
      default: false,
      type: Boolean
    },
    standout: {
      default: null
    },
    suffix: {
      default: null
    },
    prefix: {
      default: null
    },
    filled: {
      default: false
    },
    icon: {
      default: null
    },
    avatar: {
      default: null
    },
    placeholder: {
      default: null
    },
    dense: {
      default: false
    },
    outlined: {
      default: false
    },
    color: {
      default: 'blue-5'
    },
    label: {
      default: null
    },
    status: {
      type: Boolean,
      default: false
    },
    confirmedStatus: {
      type: Boolean,
      default: false
    },
    controller: {
      default: null
    }
  },
  data: () => ({
    model: null,
    list: [],
    novoregistro: null,
    completa: [],
    optionsStatus: [],
    confirmStatus: []
  }),
  mounted () {
    this.model = this.value
    this.StatusOption()
    this.ConfirmOption()
    this.Carrega()
  },
  methods: {
    StatusOption () {
      this.optionsStatus = [
        { value: true, label: 'Ativo' },
        { value: false, label: 'Desativado' }
      ]
    },
    ConfirmOption () {
      this.confirmStatus = [
        { value: true, label: 'Sim' },
        { value: false, label: 'Não' }
      ]
    },
    search (val, update) {},
    Carrega () {
      if (!this.controller && this.options) {
        this.list = this.options
        this.completa = this.list
      } else if (this.controller) {
        this.BuscarController()
      } else if (this.status) {
        this.nosearch = false
        this.list = this.optionsStatus
        this.completa = this.list
      } else if (this.confirmedStatus) {
        this.nosearch = false
        this.list = this.confirmStatus
        this.completa = this.list
      }
    },
    BuscarController () {
      this.list = []
      this.$q.loading.show()
      this.$store.dispatch('Get', this.controller)
        .then(resp => {
          if (resp) {
            var campo = ''
            resp.forEach(x => {
              campo = x
              if (this.controllerValue) {
                campo = x[this.controllerValue]
              }
              var avatarIcon = null
              if (this.avatarOption) {
                if (this.avatarOption.indexOf('.') >= 1) {
                  var item = null
                  this.avatarOption.split('.').forEach(cam => {
                    if (!item) {
                      item = x[cam]
                    } else {
                      item = item[cam]
                    }
                  })
                  avatarIcon = item
                } else {
                  avatarIcon = x[this.avatarOption]
                }
              }
              this.list.push({ label: x[this.controllerLabel], value: campo, avatar: avatarIcon })
            })
          }
          this.completa = this.list
          if (this.completa.length === 1 && this.uniq) {
            setTimeout(() => {
              this.model = this.completa[0].value
            }, 800)
          }
          this.$q.loading.hide()
        })
    }
  },
  computed: {
    isError () {
      if (this.error) return true
      else return false
    }
  },
  watch: {
    adicionar () {
      this.$emit('adicionar', this.adicionar)
      if (!this.adicionar) {
        this.BuscarController()
      }
    },
    list () {
      this.$emit('List', this.list)
    },
    value () {
      this.model = this.value
    },
    model () {
      this.$emit('input', this.model)
    }
  }
}
</script>
<style lang="stylus" scoped>
#Select
  .q-select
    margin 0 10px
  .novo
    width 100%
</style>
