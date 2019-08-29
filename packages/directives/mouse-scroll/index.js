import scrollFun from './common/scroll.js'

const mouseScroll = {
  name:'mouseScroll',
  inserted:function(el, binding, vnode){
    el.onmouseover = (e) =>{
      scrollFun.mouseScroll(el, binding, vnode)
    }
    el.onmouseout= e => {
      scrollFun.removeMouseScroll()
    }
  }
}
mouseScroll.install = Vue=>Vue.directive(mouseScroll.name,mouseScroll)
export default mouseScroll