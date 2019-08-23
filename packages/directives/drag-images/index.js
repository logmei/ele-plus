import appendDrag from './drag.js'

const dragImageDialog = {
  componentUpdated: function(el, binding, vnode) {
    appendDrag(el, binding, vnode)
  }
}

const install = Vue => {
  Vue.directive('dragImage', dragImageDialog)
}

if (window.Vue) {
  window['dragImage'] = dragImageDialog
  window.Vue.use(install)
}

dragImageDialog.install = install
export default dragImageDialog
