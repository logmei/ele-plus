
export default {
  props: {
    imageList: { // 若图片显示分类名称[{title:'title01',list:['imgurl']},{title:'title02',list:['imgurl']}];若只是图片['imgurl01','imgurl02']
      type: Array,
      required: true
    },
    windowOpenImgSwitch: {
      type: Boolean,
      required: false,
      default: false
    },
    routerPath: {
      type: String,
      required: false,
      default: 'BigImage'
    }
  },
  methods: {
    showImgLarge(index) {
      this.page = index
      this.src = typeof this.list[index] === 'object' ? this.list[index].value : this.list[index]
    },
    windowOpenImg(index) {
      if (!this.windowOpenImgSwitch) return
      console.log('windowOpenImg', index)
      this.page = index !== undefined ? index : this.page
      const src = this.list[this.page]
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
