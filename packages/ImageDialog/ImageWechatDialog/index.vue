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
    <div ref="usernameInput"  class="img-div-dialog img-dialogs" :style="shadowType?styleObjectOfShadow:{}">
      <div class="header">
         <div class="dialog-close" @click="closeDialog" ><elp-svg-icon icon-class="close"/></div>
      </div>
      <div v-show="page>0" class="img-before" @click="showImgLarge(page-1)"><elp-svg-icon icon-class="leftCircle"/></div>
      <div class="show-img-class" >
        <img :src="src===''?imageUrl:src" :style="ImageStyle">
      </div>
      <div v-show="page<list.length-1" class="img-after" @click="showImgLarge(page+1)"><elp-svg-icon icon-class="rightCircle"/></div>

      <div class="operator">
      <svg-icon icon-class="zoom-in" title="放大" @click.native="enlarge" />
      <svg-icon icon-class="zoom-out" title="缩小" @click.native="narrow" />
      <svg-icon icon-class="turnLeft" title="向左旋转" @click.native="turnLeft" />
      <svg-icon icon-class="turnRight" title="向左旋转" @click.native="turnRight" />
    </div>
    </div>
  </div>
</template>
<script>
import imageMixin from '../common/mixins/image.js'
import dragImage from '../../directives/drag-images/index.js'
import mouseScroll from '../../directives/mouse-scroll/index.js'
import operatorComponent from './components/Operater'
import dialog from '../common/mixins/dialog.js'
import ElpSvgIcon from '../../../../SvgIcon'
export default {
  name:'ElpImagesDialog',
  directives: {
    dragImage,
    mouseScroll
  },
  components: {
    operatorComponent,
    ElpSvgIcon
  },
  mixins: [imageMixin, dialog],
  props: {
    imageUrl: {
      type: String,
      required: true
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
    },
    shadowType: {
      type: Boolean,
      required: false,
      default: true
    },
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
     @include ImgDivDialog;
     @include img;
     @include SwitchBeforeAfter;

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
     @include ImgDivDialog;
     @include img;
     @include SwitchBeforeAfter;
     img{
       height: 100%;
     }

}
}

</style>
