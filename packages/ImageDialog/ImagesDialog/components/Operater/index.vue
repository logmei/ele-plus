<template>
  <div v-show="dialogVisible" class="operator-float">
    <div class="el-icon-error dialog-close" @click="closeDialog" />
    <div class="operator">
      <elp-svg-icon icon-class="up" title="上一张" @click="(page>0)?showImgLarge(page-1):''" />
      <elp-svg-icon icon-class="zoom-in" title="放大" @click.native="enlarge" />
      <elp-svg-icon icon-class="zoom-out" title="缩小" @click.native="narrow" />
      <elp-svg-icon icon-class="turnLeft" title="向左旋转" @click.native="turnLeft" />
      <elp-svg-icon icon-class="turnRight" title="向右旋转" @click.native="turnRight" />
      <elp-svg-icon icon-class="down" title="下一张" @click="page<pageCount-1?showImgLarge(page+1):''" />
    </div>
    <div class="operator-pages">
      <span>第{{ page+1 }}张</span>
      <span>共{{ pageCount }}张</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: false
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    pageCount: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(v) {
        this.$emit('update:visible', v)
      }
    }
  },
  watch: {
    visible(v) {
      if (v && this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  methods: {
    showImgLarge(page) {
      this.$emit('showImgLarge', page)
    },
    enlarge() {
      this.$emit('enlarge')
    },
    narrow() {
      this.$emit('narrow')
    },
    turnLeft() {
      this.$emit('turnLeft')
    },
    turnRight() {
      this.$emit('turnRight')
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../common/style/image.scss";
@include imageOperater;
</style>
