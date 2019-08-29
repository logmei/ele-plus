<template>
  <div 
  v-show="dialogVisible" 
  v-dragImage="shadowType?true:false" 
  v-mouseScroll 
  @downWheel="enlarge" 
  @upWheel="narrow"  
  :class="shadowType?'shadow':'noShadow'" 
  :style="shadowType?{}:styleObjectOfNoShadow"
  >
    <div ref="usernameInput"  class="img-div-dialog" :style="shadowType?styleObjectOfShadow:{}">
      <div class="dialog-close" @click="closeDialog" ><elp-svg-icon icon-class="close"  /></div>
      <div v-show="page>0" class="img-before" @click="showImgLarge(page-1)"><span>&lt;</span></div>
      <div class="show-img-class" >
        <img :src="src===''?imageUrl:src" :style="imageStyle">
      </div>
      <div v-show="page<list.length-1" class="img-after" @click="showImgLarge(page+1)"><span>&gt;</span></div>

    </div>
  </div>

</template>
<script>
import dragImage from '../../directives/drag-images' // base on element-ui
import mouseScroll from '../../directives/mouse-scroll'
import imageList from '../../ImageList/common/mixins/imageList.js'
import dialog from '../common/mixins/dialog.js'
import imageMixin from '../common/mixins/image.js'
import ElpSvgIcon from '../../SvgIcon'
export default {
  name:'ElpImageOfSelfDialog',
  directives: { dragImage, mouseScroll },
  mixins: [imageMixin, dialog],
  components:{
    ElpSvgIcon
  },
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    shadowType: {
      type: Boolean,
      required: false,
      default: true
    },
    imageStyle: {
      type: Object,
      required: false,
      default: ()=>({
        height: '800px'
      })
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

