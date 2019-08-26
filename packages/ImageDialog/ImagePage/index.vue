<template>
  <div class="image-class">
    <img ref="image" :src="src" :style="{'transform':'scale('+scale+') rotate('+rotate+'deg)'}">
    <div class="operator-float">

      <div class="operator">
        <svg-icon icon-class="up" title="上一张" @click="(page>0)?showImgLarge(page-1):''" />
        <svg-icon icon-class="zoom-in" title="放大" @click.native="enlarge" />
        <svg-icon icon-class="zoom-out" title="缩小" @click.native="narrow" />
        <svg-icon icon-class="turnLeft" title="向左旋转" @click.native="turnLeft" />
        <svg-icon icon-class="turnRight" title="向右旋转" @click.native="turnRight" />
        <svg-icon icon-class="down" title="下一张" @click="page<list.length-1?showImgLarge(page+1):''" />
      </div>
      <div class="operator-pages">
        <span>第{{ page+1 }}张</span>
        <span>共{{ list.length }}张</span>
      </div>
    </div>

    <!-- <div class="preview-images-class">
      <div class="img-before" />
      <div class="imgs">
        <img v-for="(item,index) in images" :key="index" :src="item">
      </div>
      <div class="img-after" />
    </div> -->
  </div>
</template>
<script>
import imageMixin from '../common/mixins/image.js'
// import { imageListInterface } from '@/api/approval.js'
export default {
  name: 'BigImage',
  mixins: [imageMixin],
  props:{
    ImageStyle: {
      type: Object,
      required: false,
      default: ()=>({
        height: '800px'
      })
    }
  },
  data() {
    return {
      src: '',
      guid: ''

    }
  },
  created() {
    const imageObj = JSON.parse(this.$route.params.imageUrl)
    this.src = imageObj.src
    this.guid = imageObj.guid
    this.init()
  },
  methods: {
    init() {
      // imageListInterface(this.guid).then(response => {
      //   console.log('images...', this.images)
      //   this.list = response.result
      //   this.list.forEach((image, index) => {
      //     const imgSrc = this.src === '' ? this.imageUrl : this.src
      //     if (image === imgSrc) {
      //       this.page = index
      //       return
      //     }
      //   })
      //   // console.log('images...', this.images)
      // })
    }

  }
}
</script>
<style lang="scss" scoped>
@import "../common/style/image.scss";
.image-class{
    padding: 10px;
    /* position: relative; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    @include img;
    @include imageOperater;
}
</style>

