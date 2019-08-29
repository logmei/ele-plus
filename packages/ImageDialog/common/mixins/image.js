import commonjs from '../../../ImageList/common/mixins/common.js'
import imageList from '../../../ImageList/common/mixins/imageList.js'
export default {
  mixins: [commonjs, imageList],
  data() {
    return {
      scale: 1,
      scaleStep: 0.1,
      rotate: 0,
      rotateStep: 90,
      styleObjectOfNoShadow: null,
      styleObjectOfShadow: null,
      styleShowObj: null
    }
  },
  methods: {
    enlarge() { // 放大
      this.scale += this.scaleStep
      this.changeStyleObject()
    },
    narrow() { // 缩小
      if (this.scale > 0.3) this.scale -= this.scaleStep
      this.changeStyleObject()
    },
    turnLeft() { // 向左旋转
      this.rotate -= this.rotateStep
      this.changeStyleObject()
    },
    turnRight() { // 向右旋转
      this.rotate += this.rotateStep
      this.changeStyleObject()
    },
    changeStyleObject() {
      this.styleObjectOfNoShadow = { transform: `translateY(-50%) translateX(-50%) scale(${this.scale}) rotate(${this.rotate}deg)` }
      this.styleObjectOfShadow = { transform: `translateY(-50%) translateX(-50%) scale(${this.scale}) rotate(${this.rotate}deg)` }
    }

  }
}
