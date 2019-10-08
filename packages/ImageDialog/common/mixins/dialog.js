
export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: true
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
      if (v) this.init()
      if (v && this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  methods: {
    closeDialog() {
      console.log('closeDialog...........')
      this.src = ''
      this.dialogVisible = false
      this.styleObjectOfNoShadow = { transform: `translateY(-50%) translateX(-50%)` }
      this.styleObjectOfShadow = { transform: `translateY(-50%) translateX(-50%)` }
    },
    init() {
      this.styleObjectOfNoShadow = { transform: `translateY(-50%) translateX(-50%)` }
      this.styleObjectOfShadow = { transform: `translateY(-50%) translateX(-50%)` }
      //console.log('image list ', this.list)
      this.list.forEach((item, index) => {
        const image = typeof item === 'object' ? item.value : item
        const imgSrc = this.src === '' ? this.imageUrl : this.src
        if (image === imgSrc) {
          this.page = index
          return
        }
      })
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}
