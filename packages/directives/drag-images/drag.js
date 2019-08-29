function appendDrag(el, binding, vnode) {
  
  const dragDom = el.querySelector('.show-img-class')
  const moveDom = el.querySelector('.img-div-dialog')
  // console.log('dragDom..............')
  dragDom.style.cssText += ';cursor:move;'
  // dragDom.style.cssText += ';top:0px;'
  // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
  const getStyle = (function() {
    if (window.document.currentStyle) {
      return (dom, attr) => dom.currentStyle[attr]
    } else {
      return (dom, attr) => getComputedStyle(dom, false)[attr]
    }
  })()

  dragDom.onmousedown = (e) => {
    e.preventDefault()
    // moveDom.style.cssText += '; position: fixed;'
    // console.log('drag..............')
    const startX = e.clientX
    const startY = e.clientY
    // 获取到的值带px 正则匹配替换
    let styL = getStyle(el, 'left')
    let styT = getStyle(el, 'top')

    let styLm = getStyle(moveDom, 'left')
    let styTm = getStyle(moveDom, 'top')

    if (styL.includes('%')) {
      styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
      styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      styLm = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
      styTm = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
    } else {
      styL = +styL.replace(/\px/g, '')
      styT = +styT.replace(/\px/g, '')
      styLm = +styLm.replace(/\px/g, '')
      styTm = +styTm.replace(/\px/g, '')
    }

    document.onmousemove = (e) => {
      const left = e.clientX - startX
      const top = e.clientY - startY
      // 移动当前元素
      if(binding.value) {
        // moveDom.style.cssText += '; position: fixed;'
        moveDom.style.cssText += `;left:${left + styLm}px;top:${top + styTm}px`
      } else {
        el.style.cssText += `;left:${left + styL}px;top:${top + styT}px`
        // vnode.child.$emit('dragDialog')
      }
     
    }

    document.onmouseup = function(e) {
      document.onmousemove = null
      document.onmouseup = null
    }

 }
}

export default appendDrag
