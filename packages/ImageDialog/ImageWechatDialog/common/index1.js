class ImgDialog {
  // 偏移量
   closedOffset = { x: -10, y: -30 }
   operatorOffset = { x: -270, y: 0 }
   // 切换图片块的高度
   switchBlock = {
     width: 40,
     height: 50,
     offset: {
       x: -30,
       y: -30
     }
   }
   getStyle = (function() {
     if (window.document.currentStyle) {
       return (dom, attr) => (dom.currentStyle[attr]).replace('px', '')
     } else {
       return (dom, attr) => parseInt((window.getComputedStyle(dom, false)[attr]).replace('px', ''))
     }
   })()
   constructor(el) {
     // console.log('imagedialog el', el)
     this.width = this.getStyle(el, 'width')
     this.height = this.getStyle(el, 'height')
     this.top = this.getStyle(el, 'top')
     this.left = this.getStyle(el, 'left')
     this.top = 0
     this.left = 0
     // 象限坐标
     this.rightTopPointPosition = { x: 0, y: 0 }
     this.rightBottomPointPosition = { x: 0, y: 0 }
     this.leftTopPointPosition = { x: 0, y: 0 }
     this.leftBottomPointPosition = { x: 0, y: 0 }
     this.init()
   }
   init() {
     this.firstQuadrant()
   }
   firstQuadrant() {
     console.log('firstQuadrant')
     this.rightTopPointPosition = { x: this.width, y: 0 }
     this.rightBottomPointPosition = { x: this.width, y: this.height }
     this.leftBottomPointPosition = { x: 0, y: this.height }
     this.leftTopPointPosition = { x: 0, y: 0 }
   }
   secondQuadrant() {
     console.log('secondQuadrant')
     this.rightTopPointPosition = { x: this.height, y: 0 }
     this.rightBottomPointPosition = { x: this.height, y: this.width }
     this.leftBottomPointPosition = { x: 0, y: this.width }
     this.leftTopPointPosition = { x: 0, y: 0 }
   }

   closePosition() {
     return { x: this.rightTopPointPosition.x + this.left + this.closedOffset.x, y: this.rightTopPointPosition.y + this.top + this.closedOffset.y }
   }

   operatorPosition() {
     return { x: this.rightTopPointPosition.x + this.left + this.operatorOffset.x, y: this.rightTopPointPosition.y + this.top + this.operatorOffset.y }
   }

   leftBlockPosition() {
     return { x: this.left, y: Math.floor((this.leftBottomPointPosition.y - this.switchBlock.height) / 2) + this.top + this.switchBlock.offset.y }
   }

   rightBlockPosition() {
     return { x: this.left + this.rightTopPointPosition.x - this.switchBlock.width + this.switchBlock.offset.x, y: Math.floor((this.rightBottomPointPosition.y - this.switchBlock.height) / 2) + this.top + this.switchBlock.offset.y }
   }
}

export default ImgDialog
