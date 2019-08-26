<template>
  <div>
    <images-component 
    v-for="(item,index) in imageList" 
    :key="index" 
    :title="item.title" 
    :list="item.list" 
    @showImgLarge="showImgLarge" 
    @windowOpenImg="windowOpenImg"
     />
    <image-of-self-dialog
      v-if="dialogType === 'self'"
      :visible.sync="dialogVisible"
      :image-list="imageList"
      :shadow-type="shadow"
      append-to-body
      :guid="guid"
      :image-url="src"
    />
    <images-dialog
      v-else
      :visible.sync="dialogVisible"
      :image-list="imageList"
      :shadow-type="shadow"
      append-to-body
      :guid="guid"
      :image-url="src"
    /></div>
</template>
<script>
import ImagesComponent from './components/ImagesItem'
import ImagesDialog from '../ImageDialog/ImagesDialog'
import ImageOfSelfDialog from '../ImageDialog/ImageOfSelfDialog'
import common from './common/mixins/common.js'
export default {
  name:'ElpImageList',
  components: {
    ImagesComponent,
    ImagesDialog,
    ImageOfSelfDialog
  },
  mixins: [common],
  provide: function() {
    return {
      windowOpenImgSwitch: this.windowOpenImgSwitch,
      imgsStyle: this.imgsStyle,
      ImageStyle: this.ImageStyle
    }
  },
  props: {
    guid: {
      type: String,
      required: false,
      default: ''
    },
    visible: {//若存在父级弹出框，提供关闭子窗口
      type: Boolean,
      required: true,
      default: false
    },
    dialogType: {
      type: String,
      required: false,
      default: 'self'
    },
    shadow: {
      type: Boolean,
      required: false,
      default: true
    },
    imgsStyle: {
      type: Object,
      required: false,
      default: ()=>({
        width:'250px',
        height:'170px'
      })
    },
    ImageStyle: {
       type: Object,
      required: false,
      default: ()=>({
        height:'800px'
        // width:'800px'
      })
    }
  },
  data() {
    return {
      src: ''
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
  methods: {
    showImgLarge(src) {
      this.src = src
      this.dialogVisible = true
      console.log('showImgLarge..........', src)
    },
    windowOpenImg(src) {
      const url = window.location.href.substring(0, window.location.href.indexOf('#') - 1)
      const imageUrl = encodeURIComponent(JSON.stringify({ src: src, guid: this.guid }))
      console.log(url)
      if (this.routerPath === '') {
        this.$message.error('路由地址不正确！')
      } else {
        window.open(`${url}/#/${this.routerPath}/${imageUrl}`)
      }
    }
  }
}
</script>
