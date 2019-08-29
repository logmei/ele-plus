<template>
  <div v-show="dialogVisible" v-dragImage="shadowType?true:false" v-mouseScroll @downWheel="enlarge" @upWheel="narrow" :class="shadowType?'shadow':'noShadow'">
    <div ref="usernameInput"  class="img-div-dialog img-dialogs" >

      <div class="show-img-class" :title="title" :style="styleObject">
        <img :src="src===''?imageUrl:src" :style="ImageStyle">
      </div>
      <operatorComponent
        :visible.sync="dialogVisible"
        :page="page"
        :page-count="list.length"
        :append-to-body="appendToBody"
        @showImgLarge="showImgLarge"
        @enlarge="enlarge"
        @narrow="narrow"
        @turnLeft="turnLeft"
        @turnRight="turnRight"
        @closeDialog="closeDialog"
      />
    </div>
  </div>
</template>
<script>
import imageMixin from '../common/mixins/image.js'
import dragImage from '../../directives/drag-images/index.js'
// import mouseScroll from '../../directives/mouse-scroll/index.js'
import operatorComponent from './components/Operater'
import dialog from '../common/mixins/dialog.js'
export default {
  name:'ElpImagesDialog',
  directives: {
    dragImage
    // mouseScroll
  },
  components: {
    operatorComponent
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
      src: '',
      styleObject: {
        transform: `scale(1) rotate(0deg)`
      }
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
     z-index: 200000;
     position: fixed;
     margin: 0 auto;
     top: 50%;
     left: 50%;
     transform: translateY(-50%) translateX(-50%);
     @include img;

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
     z-index: 200000;
     position: fixed;
     margin: 0 auto;
     top: 50%;
     left: 50%;
     transform: translateY(-50%) translateX(-50%);
     @include img;
     img{
       height: 100%;
     }

}
}

</style>
