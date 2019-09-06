import appendDrag from './drag.js'

const dragImageDialog = {
  name: 'wechatDragImage',
  componentUpdated: function(el, binding, vnode) {
    appendDrag(el, binding, vnode)
  }
}

const install = Vue => {
  Vue.directive(dragImageDialog.name, dragImageDialog)
}

if (window.Vue) {
  window[dragImageDialog.name] = dragImageDialog
  window.Vue.use(install)
}

dragImageDialog.install = install
export default dragImageDialog
