
export default {
  props: {
    imageList: { // 若图片显示分类名称[{title:'title01',list:['imgurl']},{title:'title02',list:['imgurl']}];若只是图片['imgurl01','imgurl02']
      type: Array,
      required: true
    }
  },
  data() {
    return {
      list: [],
      page: 0
    }
  },
  created() {
    this.initList()
  },
  watch: {
    imageList(v) {
      this.initList()
    }
  },
  methods: {
    initList() {
      if (this.imageList.length > 0 && typeof this.imageList[0] === 'object') {
        this.list = this.imageList.reduce((arr, item) => {
          const l = item.list.map(v => ({ title: item.title, value: v }))
          return [...arr, ...l]
        }, [])
      } else {
        this.list = this.imageList
      }
    }
  }
}
