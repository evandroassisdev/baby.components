<template>
  <div id="Input">
    <q-input v-model="model" :mask='mask'  :stack-label='stack' :outlined="outlined" :error="isError" :rounded='round' :dark='dark' :color='color' :placeholder='placeholder' :standout='standout' :dense="dense" :filled='filled' :type="typeCamp" inputmode="decimal" :prefix='prefix' :suffix='suffix' v-if="!label" v-on:blur="$emit('blur', true)" @keyup='$emit("keyup", true)'>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" @click='AplicaData()'>
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="model" mask='DD/MM/YYYY' @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
        <q-icon name="close" v-if='close' @click="model = null" class="cursor-pointer" />
      </template>
      <template v-slot:error v-if="error">
        {{error}}
      </template>
    </q-input>
    <q-input :label='label' :mask='mask' v-model="model" :stack-label='stack' :outlined="outlined" :error="isError" :rounded='round'
     :dark='dark' :color='color' :placeholder='placeholder' :standout='standout' :dense="dense" :filled='filled' :type="typeCamp"  inputmode="decimal"
      :prefix='prefix' :suffix='suffix' v-else v-on:blur="$emit('blur', true)" :autofocus='autofocus'  @keyup='$emit("keyup", true)'>
      <template v-slot:prepend >
        <q-icon :name="icon"/>
      </template>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer" @click='AplicaData()'>
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="model" :color="bgColor" mask='DD/MM/YYYY' @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
        <q-icon name="close" v-if='close' @click="model = null" class="cursor-pointer" />
      </template>
      <template v-slot:error v-if="error">
        {{error}}
      </template>
    </q-input>
  </div>
</template>
<script>
import { date } from 'quasar'
export default {
  props: {
    error: {
      default: null
    },
    autofocus: {
      default: false,
      type: Boolean
    },
    round: {
      default: false,
      type: Boolean
    },
    value: {
      required: true
    },
    close: {
      default: true,
      type: Boolean
    },
    standout: {
      default: null
    },
    validate: {
      default: null
    },
    suffix: {
      default: null
    },
    prefix: {
      default: null
    },
    inputmode: {
      default: 'text'
    },
    type: {
      default: 'text'
    },
    filled: {
      default: false,
      type: Boolean
    },
    dark: {
      default: false,
      type: Boolean
    },
    iconleft: {
      default: null
    },
    stack: {
      default: true,
      type: Boolean
    },
    icon: {
      default: null
    },
    placeholder: {
      default: null
    },
    dense: {
      default: false,
      type: Boolean
    },
    outlined: {
      default: false,
      type: Boolean
    },
    color: {
      default: 'blue-5'
    },
    mask: {
      default: '##/##/####'
    },
    label: {
      default: ''
    },
    bgColor: {
      default: "blue"
    }
  },
  data: () => ({
    model: null,
    isPwd: true
  }),
  computed: {
    isError () {
      if (this.error) return true
      else return false
    },
    typeCamp () {
      if (this.type === 'password') {
        if (this.isPwd) return 'password'
        else return 'text'
      } else if (this.type === 'color') {
        return 'text'
      } else {
        return this.type
      }
    }
  },
  mounted () {
    this.model = this.dataMask(this.value)
  },
  methods: {
    AplicaData () {
      if (!this.model) {
        this.model = new Date()
      }
    },
    AcertData (value) {
      if (this.mask === '##/##/####') {
        if (this.model && this.model.includes('/')) {
          var explode = this.model.split('/')
          var data = new Date(explode[2], explode[1] - 1, explode[0])
          return data
        }
      }
      return value
    },
    dataMask (value) {
      if (this.mask === '##/##/####') {
        var data = date.formatDate(value, 'DD/MM/YYYY')
        return data
      }
      return value
    }
  },
  watch: {
    value () {
      this.model = this.dataMask(this.value)
    },
    model () {
      this.$emit('input', this.AcertData(this.model))
    }
  }
}
</script>
<style lang="stylus" scoped>
#Input
  padding 5px

@media (min-width: 180px) and (max-width: 780px)
  #Input
    padding 5px
    .q-input
      font-size 18px !important
</style>
