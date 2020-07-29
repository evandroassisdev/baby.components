<template>
  <div id="Input">
    <q-input v-model="model" :label="label" :color="color" :bg-color="background" :filled="filled" :outlined="outlined" :standout="standout" :borderless="borderless" :rounded="rounded" :dark="dark" :mask="mask" :placeholder="placeholder" :type="typeCamp" :error="isError">
      <template v-slot:prepend v-if="icon" :autofocus='autofocus'>
        <q-icon :name="icon"/>
      </template>
      <template v-slot:append>
        <q-icon name="close" v-if='close' @click="model = null" class="cursor-pointer" />
        <q-btn round dense flat v-if='iconleft' :icon="iconleft" />
        <q-icon v-if="type == 'password'"
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
      <template v-slot:error>
        {{error}}
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    icon: {
      default: null
    },
    iconleft: {
      default: null
    },
    close: {
      default: true,
      type: Boolean
    },
    autofocus: {
      default: false,
      type: Boolean
    },
    label: {
      default: 'Label',
      type: String
    },
    color: {
      require: false
    },
    background: {
      require: false
    },
    filled: {
      default: false,
      type: Boolean
    },
    outlined: {
      default: false,
      type: Boolean
    },
    standout: {
      default: false,
      type: Boolean
    },
    borderless: {
      default: false,
      type: Boolean
    },
    rounded: {
      default: false,
      type: Boolean
    },
    dark: {
      default: false
    },
    mask: {
      require: false
    },
    placeholder: {
      require: false,
      type: String
    },
    error: {
      default: null
    },
    type: {
      default: 'text'
    }
  },
  data: () => ({
    model: null,
    isPwd: true
  }),
  mounted () {
    this.model = this.value
  },
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
  watch: {
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
#Input
  .q-input
    margin 0 10px
</style>
