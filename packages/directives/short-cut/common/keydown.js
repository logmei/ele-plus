import { conChooseAction, IS_MATCH } from './methods.js'
import { METHODS_FUN } from './constants.js'
import ChooseByKeydownClass from './ChooseByKeydownClass.js'
/**
 * 绑定按键事件
 * @param {String} funKey :功能键名
 */
function conChoose(funKey) {
  return function(el, binding, vnode) {
    const chooseByKeydown = ChooseByKeydownClass.getInstance()
    chooseByKeydown.initParams(el, binding, vnode)// 重新获取inputs
    chooseByKeydown.resetIndex()// 重置index
    chooseByKeydown.initChoosed()// 初始化选中
    const action = conChooseAction(chooseByKeydown) // 操作action
    const methodNames = METHODS_FUN[funKey] // 对应功能的methodlist
    chooseByKeydown.inputs.forEach((element, index) => {
      element.addEventListener('keydown', function(e) {
        // console.log('conChoose', Object.keys(methodNames), e.keyCode, Object.keys(methodNames).indexOf('' + e.keyCode))
        if (isTriggerAction(e, chooseByKeydown, methodNames)) {
          action(methodNames[e.keyCode], index)
        }
      })
    })
  }
}
/**
 * 判断是否触发事件
 * @param {Object} e : element
 * @param {Object} chooseByKeydown : 操作对象
 * @param {Array} methodNames: 对应功能的methodlist
 */
function isTriggerAction(e, chooseByKeydown, methodNames) {
  let ret = true
  if (Object.keys(methodNames).indexOf('' + e.keyCode) === -1) {
    ret = false
    return
  }
  const IgnoreMethodNames = METHODS_FUN.Arrow
  chooseByKeydown.IGNORE_ARROW_OPERATOR.forEach(o => {
    if (IS_MATCH[o](e.target) && Object.keys(IgnoreMethodNames).indexOf('' + e.keyCode) !== -1) {
      ret = false
      return
    }
  })

  return ret
}

export default {
  arrow: conChoose('Arrow'),
  keyDown: conChoose('KeyDown'),
  enter: conChoose('Enter')
}
