<template>
  <div class="detail-dialog">
    <el-dialog
      id="detail-dialog-div-dialog"
      ref="customDialog"
      :title="title"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :custom-class="dialogClass"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :style="styleObject"
      :append-to-body="appendToBody"
      :modal-append-to-body="modalAppendToBody"
      @opened="opened"
      @closed="closed"
      @open="open"
      @close="close"
    >
      <span slot="title">
        <slot name="title">
          <span style="float: left;" v-html="title" />
        </slot>
      </span>

      <slot />
      <span slot="footer">
        <slot name="footer">
          <span v-html="footer" />
        </slot>
      </span>

    </el-dialog>
  </div>

</template>
<script>
const DIRECTION = {
  center: {
    key: 'center',
    className: 'dialog-class',
    remark: '默认显示方式，居中显示'
  },
  top: {
    key: 'top',
    className: 'dialog-class top-dialog-class',
    remark: '从顶部滑出'
  },
  bottom: {
    key: 'bottom',
    className: 'dialog-class bottom-dialog-class',
    remark: '从底部滑出'
  },
  right: {
    key: 'right',
    className: 'dialog-class right-dialog-class',
    remark: '从右侧滑出'
  },
  left: {
    key: 'left',
    className: 'dialog-class left-dialog-class',
    remark: '从左侧滑出'
  },
  rightSide: {
    key: 'rightSide',
    className: 'dialog-class right-side-dialog-class',
    remark: '从右侧滑出，贴近边缘'
  },
  leftSide: {
    key: 'leftSide',
    className: 'dialog-class left-side-dialog-class',
    remark: '从左侧滑出，贴近边缘'
  },
  topSide: {
    key: 'topSide',
    className: 'dialog-class top-side-dialog-class',
    remark: '从顶部滑出，贴近边缘'
  }
}
export default {
  name:'ElpDialog',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    width: {
      type: String,
      required: false,
      default: '80%'
    },
    closeOnClickModal: {
      type: Boolean,
      required: false,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      required: false,
      default: false
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true
    },
    slideOutType: {
      type: String,
      required: false,
      default: 'center'
    },
    footer: {
      type: String,
      required: false,
      default: ''
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      required: false,
      default: true
    }

  },
  data() {
    return {
      isSlideOut: false,
      slideOutKey: 'center',
      dialogClass: '',
      dialogWidth: this.width,
      type: 'right',
      transformWidth: '0',
      transformHeight: '0',
      styleObject: null
    }
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible
      },
      set: function(v) {
        this.$emit('update:visible', v)
      }
    }
  },
  provide: function() {
    return {
      dialogState: this.getDialogState
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.slideOutType !== 'center') {
        this.isSlideOut = true
        this.slideOutKey = DIRECTION[this.slideOutType].key
        this.dialogClass = DIRECTION[this.slideOutType].className
      } else {
        this.isSlideOut = false
        this.slideOutKey = 'center'
        this.dialogClass = ''
      }
    },
    open() {
      if (this.isSlideOut) this.slideInFun()
      this.$emit('open')
    },
    close() {
      this.dialogVisible = false
      this.$emit('close')
    },
    opened() {
      if (this.isSlideOut) this.slideOutFun()
      this.$emit('opened')
    },
    closed() {
      if (this.isSlideOut) this.slideInFun()
      this.$emit('closed')
    },
    slideOutFun() {
      this.slideFun(0, 0)
    },
    slideInFun() {
      const width = document.body.offsetWidth
      const height = document.body.offsetHeight
      this.slideFun(width, height)
    },
    slideFun(width, height) {
      const dialogObj = this.$refs['customDialog'].$el
      switch (this.slideOutKey) {
        case DIRECTION.right.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateX(${width}px)`
          // this.styleObject = { transform: `translateX(${width}px)` }
          break
        case DIRECTION.left.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateX(-${width}px)`
          // this.styleObject = { transform: `translateX(-${width}px)` }
          break
        case DIRECTION.top.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateY(-${height}px)`
          // this.styleObject = { transform: `translateY(-${height}px)` }
          break
        case DIRECTION.bottom.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateY(${height}px)`
          // this.styleObject = { transform: `translateY(${height}px)` }
          break
        case DIRECTION.rightSide.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateX(${width}px)`
          // this.styleObject = { transform: `translateX(${width}px)` }
          break
        case DIRECTION.leftSide.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateX(-${width}px)`
          // this.styleObject = { transform: `translateX(-${width}px)` }
          break
        case DIRECTION.topSide.key:
          dialogObj.querySelector('.dialog-class').style.transform = `translateY(-${height}px)`
          // this.styleObject = { transform: `translateY(-${height}px)` }
          break
      }
    },
    getDialogState() {
      return this.visible
    }

  }
}
</script>
<style lang="scss" scoped>
 .detail-dialog /deep/ .dialog-class{
     background: #ffffff;
     transition: transform 1s;
 }
   .detail-dialog /deep/.top-side-dialog-class{
        margin-top:0 !important;
    }
     .detail-dialog /deep/.right-side-dialog-class{
        margin-right:0;
    }
     .detail-dialog /deep/.left-side-dialog-class{
        margin-left:0;
    }
   .detail-dialog /deep/ .el-dialog__header,.detail-dialog-div /deep/.el-dialog__body{
       background: #ffffff;
   }

</style>

