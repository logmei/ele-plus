<template>
  <div v-show="dialogVisible" ref="usernameInput" v-dragImage :style="styleObject" class="img-div-dialog">
    <div class="el-icon-circle-close-outline dialog-close" @click="dialogVisible=false" />
    <div class="operator">
      <svg-icon icon-class="zoom-in" title="放大" @click.native="enlarge" />
      <svg-icon icon-class="zoom-out" title="缩小" @click.native="narrow" />
      <svg-icon icon-class="turnLeft" title="向左旋转" @click.native="turnLeft" />
      <svg-icon icon-class="turnRight" title="向左旋转" @click.native="turnRight" />
    </div>
    <div v-show="leftPageShow" class="img-before" @click="showImgLargeLeft">&lt;</div>
    <div class="showImgClass" :title="title">
      <img :src="src" height="800px" @click.ctrl.exact="windowOpenImg">
    </div>
    <div v-show="true" class="img-after" @click="showImgLargeRight">&gt;</div>

  </div>
</template>
<script>
import imageMixin from '@/views/controller/common/mixin/image.js'
import dragImage from '@/directive/drag-images/index.js'
import ImgDialog from './common/index.js'
export default {
  directives: {
    dragImage
  },
  mixins: [imageMixin],
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
    src: {
      type: String,
      required: true
    },
    leftPageShow: {
      type: Boolean,
      required: false,
      default: false
    },
    rightPageShow: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    showWindowImg: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      imgDialog: null,
      styleObject: {
        transform: `translateY(-50%) translateX(-50%) scale(1) rotate(0deg)`
      }
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
      this.$nextTick(() => {
        this.init()
      })
    }
  },
  methods: {
    init() {
      // console.log('-------', this.$el)
      this.imgDialog = new ImgDialog(this.$el)
      this.setBlocksPosition()
    },
    // 设置位置
    setBlocksPosition() {
      this.setClosePos({ ...this.imgDialog.closePosition(), className: 'dialog-close' })
      this.setClosePos({ ...this.imgDialog.operatorPosition(), className: 'operator' })
      this.setClosePos({ ...this.imgDialog.leftBlockPosition(), className: 'img-before' })
      this.setClosePos({ ...this.imgDialog.rightBlockPosition(), className: 'img-after' })
    },
    // 选择图片抛出的事件
    showImgLargeLeft() {
      this.$emit('showImgLargeLeft')
    },
    showImgLargeRight() {
      this.$emit('showImgLargeRight')
    },
    windowOpenImg() {
      this.$emit('windowOpenImg')
    },
    // 设置位置
    setClosePos({ x: left, y: top, className }) {
      this.$el.querySelector(`.${className}`).style.cssText += `;position:fixed;left:${left}px;top:${top}px`
    },
    enlarge() { // 放大
      this.scale += this.scaleStep
    },
    narrow() { // 缩小
      if (this.scale > 0) this.scale -= this.scaleStep
    },
    turnLeft() { // 向左旋转
      this.rotate -= this.rotateStep
      this.setQuadrant()
    },
    turnRight() { // 向右旋转
      this.rotate += this.rotateStep
      this.setQuadrant()
    },
    // 判断象限
    setQuadrant() {
      this.styleObject.transform = `translateY(-50%) translateX(-50%) scale(${this.scale}) rotate(${this.rotate}deg)`
      this.$nextTick().then(() => {
        (this.rotate / this.rotateStep) % 2 === 0 ? this.imgDialog.firstQuadrant() : this.imgDialog.secondQuadrant()
        this.setBlocksPosition()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .img-div-dialog{
     z-index: 200000;
     position: fixed;
     margin: 0 auto;
     top: 50%;
     left: 50%;
    //  transform: translateY(-50%) translateX(-50%);
    border: 10px solid rgba(0,0,0,0.05);
    box-shadow: 0 0 5px #383737;
    background: #ffffff;
    .dialog-close{
      position: absolute;
      right: -34px;
      top: -28px;
      font-size: 24px;
      color: #fff;
    }
    .operator{
      z-index: 200010;
        display: flex;
        position: absolute;
        justify-content: space-evenly;
        font-size: 30px;
        padding: 10px 20px;
        align-items: center;
        /* bottom: 0; */
        // bottom: 20px;
        border-radius: 5px;
        width: 250px;
        margin: 0 auto;
        color: #eee;
        background: rgba(0, 0, 0, 0.4);
        .el-icon-zoom-in,.el-icon-zoom-out,.svg-icon{
            cursor: pointer;
        }
    }
    .img-before{
            width: 50px;
            height: 70px;
            background: rgba(0,0,0,0.4);
            /* border: 1px solid #cccccc; */
            position: absolute;
            z-index: 1;
            font-size: 30px;
            line-height: 72px;
            padding: 0 14px;
            color: #fff;
            top: 50%;
            left: 0;
            cursor: pointer;
        }
    .img-after{
        width: 50px;
        height: 70px;
        background: rgba(0,0,0,0.4);
        /* border: 1px solid #cccccc; */
        position: absolute;
        z-index: 1;
        font-size: 30px;
        line-height: 72px;
        padding: 0 14px;
        color: #fff;
        top: 50%;
        right: 0;
        cursor: pointer;
    }
}
</style>
