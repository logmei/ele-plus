import KeyDownKey from './common/keydown.js'
const shortCut = {
  name:'shortCut',
  inserted: function(el, binding, vnode) {
    switch (binding.arg) {
      case 'keydown' :
        setTimeout(function() {
          if (binding.modifiers.enter) (KeyDownKey.enter)(el, binding, vnode)
          if (binding.modifiers.arrow) (KeyDownKey.arrow)(el, binding, vnode)
          if (binding.modifiers.keyDown) (KeyDownKey.keyDown)(el, binding, vnode)
        }, 0)

        break
    }
  },
  componentUpdated: function(el, binding, vnode) {
    switch (binding.arg) {
      case 'keydown' :
        setTimeout(function() {
          if (binding.modifiers.enter) (KeyDownKey.enter)(el, binding, vnode)
          if (binding.modifiers.arrow) (KeyDownKey.arrow)(el, binding, vnode)
          if (binding.modifiers.keyDown) (KeyDownKey.keyDown)(el, binding, vnode)
        }, 0)
        break
    }
  }

}
shortCut.install = Vue => Vue.directive('shortCut', shortCut)
export default shortCut
