<template>
  <div class="images-class">
    <div class="title">{{ title }}</div>
    <div class="content">
      <div 
       v-for="(item,index) in list"
      class="content-image-class"
      >
      <img
        :key="index"
        :src="item.url || item"
        :title="windowOpenImgSwitch ? '按住ctrl键点击：打开新窗口':''"
        :style="imgsStyle"
        @click.exact="showImgLarge(index)"
        @click.ctrl.exact="windowOpenImg(index)"
      >
      <div class="sub-description-class" v-if="item.describe">{{item.describe}}</div>

      </div>
      
    </div>
  </div>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  inject: ['windowOpenImgSwitch','imgsStyle'],
  data() {
    return {
      src: '',
      // ImgLargeHtml: '',
      page: 0
    }
  },
  methods: {
    showImgLarge(index) {
      this.page = index
      this.src = typeof this.list[index] === 'object' ? this.list[index].url : this.list[index]
      // this.ImgLargeHtml = `<img src="${src}" width="750px">`

      this.$emit('showImgLarge', this.list[index].url||this.list[index])
    },
    windowOpenImg(index) {
      if (!this.windowOpenImgSwitch) return
      console.log('windowOpenImg', index)
      this.page = index !== undefined ? index : this.page
      const src = this.list[this.page]
      this.$emit('windowOpenImg', src)
    },
    handleDrag() {
      // this.$refs.select.blur()
    }
  }
}
</script>
<style lang="scss" scoped>
.images-class {
    .title{
      margin: 8px;
    }
    .content{
     display: flex;
    justify-content: center;
        img{
            border-radius: 5px;
            margin-right:10px;
            margin-bottom: 10px;
            box-shadow: 0 0 2px #d6d6d6, 0 0 2px #676767;
            transition: box-shadow 1s;
        }
        img:hover{
            box-shadow: 0 0 2px #60b7b7,0 0 2px #60b7b7;
            cursor: pointer;
        }
    }
    .content-image-class{
      display: inline-block;
      .sub-description-class{
         font-size: 12px;
         font-weight: 500;
      }
    }

}

</style>

