<template>
  <el-button
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>
<script>
import { debounce } from '../../utils/index.js'
export default {
  name: 'ElpButton',
  props: {
    size: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'default'
    },
    plain: {
      type: Boolean,
      required: false,
      default: false
    },
    round: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    nativeType: {
      type: String,
      require: false,
      default: 'button'
    }
  },
  methods: {
    handleClick: debounce(function(evt) {
      this.$emit('click', evt)
      console.log('click.................')
    }, 1000, true)
  }
}
</script>
