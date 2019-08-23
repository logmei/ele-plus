<template>
  <div v-show="dialogVisible" :class="shadowType?'shadow':'noShadow'">
    <div ref="usernameInput" v-dragImage class="img-div-dialog">
      <div class="el-icon-circle-close-outline dialog-close" @click="dialogVisible=false" />
      <div v-show="page>0" class="img-before" @click="showImgLarge(page-1)">&lt;</div>
      <div class="show-img-class">
        <img :src="src===''?imageUrl:src" style="height:800px">
      </div>
      <div v-show="page<list.length-1" class="img-after" @click="showImgLarge(page+1)">&gt;</div>

    </div>
  </div>

</template>
<script>
import dragImage from '../../directives/drag-images' // base on element-ui
import imageList from '../../ImageList/common/mixins/imageList.js'
import dialog from '../common/mixins/dialog.js'
import commonjs from '../../ImageList/common/mixins/common.js'
export default {
  directives: { dragImage },
  mixins: [commonjs, imageList, dialog],
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    guid: {
      type: String,
      required: false,
      default: ''
    },
    shadowType: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      src: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/style/image.scss";

.shadow{
  z-index: 200000;
  position: fixed;
  margin: 0 auto;
  top: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  .img-div-dialog{
     @include simpleImgDivDialogOfShadow;
     @include simpleSwitchImg;
 }
}
.noShadow{
  z-index: 200000;
  position: fixed;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  .img-div-dialog{
   @include simpleImgDivDialogOfNoShadow;
   @include simpleSwitchImg;
   }
}

</style>

