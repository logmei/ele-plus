import { typeOf, IS_MATCH } from './methods.js'
export default class ChooseByKeydownClass {
    SELECT_INPUT_TYPES = ['input', 'select', 'testarea']
    IGNORE_ARROW_OPERATOR = ['date', 'select']
    IGNORE_INPUTS = ['radio', 'checkbox', 'disabled', '_multi_select_hidden']
    CURSOR_INDEX = 0
    /**
     *
     * @param {Object} el :el对象
     * @param {Object} binding :绑定的值
     *  binding.value:值的响应式的，结构如下
     * 1、如果是number:每行个数，用于上下键
     * 2、如果是可变值value!=oldValue:用于重置光标位置
     * 3、如果为对象modifiers.self===false：
     *  {
     *   parenClassName:[String] 查找classname下的操作框
     *   rowCount:[Number] 每行个数，用于上下键
     *   callBack:[Function] 回调函数
     * }
     * 4、如果为对象modifiers.self===true 用于光标跳转指定值
     * 默认为id: value=[String]
     * @param {vnode} vnode :虚拟节点
     */
    constructor() {
      // this.instance = null
    }
    initParams(el, binding) {
      this.el = el
      this.binding = binding
      this.inputs = []
      this.inputs = this.getEffectiveInput()
      this.rowCount = this.getRowCount()
      this.inputLen = this.inputs.length
      this.callBack = this.getCallBack()
    }
    static getInstance() {
    //   debugger
      if (!this.instance) this.instance = new ChooseByKeydownClass()
      return this.instance
    }
    // 获取每行中操作元素的个数，上下键操作时使用
    getRowCount() {
      if (typeOf('number')(this.binding.value)) {
        return this.binding.value
      } else if (typeOf('object')(this.binding.value)) {
        return this.binding.value.rowCount
      }
    }
    // 结尾时回调函数
    getCallBack() {
      if (typeOf('object')(this.binding.value)) {
        return this.binding.value.callBack
      } else {
        return new Function()
      }
    }
    // 重置index
    resetIndex() {
    //   debugger
      if (this.binding.value !== this.binding.oldValue) {
        typeOf('object')(this.binding.value) && this.binding.value.keepLastFocus ? this.CURSOR_INDEX++ : this.CURSOR_INDEX = 0
      }
    }
    // 初始选中
    initChoosed() {
    //   debugger
    //   if (this.binding.modifiers.self) {
    //     (() => appointElementFocus(this))()
    //   }
      // console.log('initChoosed')
      if (!this.inputs[this.CURSOR_INDEX]) {
        this.CURSOR_INDEX = 0
      }
      if (this.inputs[this.CURSOR_INDEX]) this.inputs[this.CURSOR_INDEX].focus()
    }
    querySelectorAll() {
      // 指定元素列表
      if (this.binding.modifiers.self && this.binding.value) {
        if (typeOf('array')(this.binding.value)) {
          return this.el.querySelectorAll(`#${this.binding.value.join(',#')}`)
        } else if (typeOf('string')(this.binding.value)) {
          return this.el.querySelectorAll(`#${this.binding.value}`)
        }
      }
      // 自动获取元素列表
      if (typeOf('object')(this.binding.value) && this.binding.value.parenClassName && this.el.getElementsByClassName(this.binding.value.parenClassName)[0]) {
        return this.el.getElementsByClassName(this.binding.value.parenClassName)[0].querySelectorAll(this.SELECT_INPUT_TYPES.join())
      } else {
        return this.el.querySelectorAll(this.SELECT_INPUT_TYPES.join())
      }
    }
    // 获取需要操作的元素
    getEffectiveInput() {
    //   debugger
      const inputs = this.querySelectorAll()
      const ignore_inputs = typeOf('object')(this.binding.value) ? (this.binding.value.ignore ? [...this.IGNORE_INPUTS, ...this.binding.value.ignore] : this.IGNORE_INPUTS) : this.IGNORE_INPUTS
      const newInputs = []
      inputs.forEach(ele => {
        let filter = false // 过滤
        ignore_inputs.forEach(key => {
          if (IS_MATCH[key] && IS_MATCH[key](ele)) {
            filter = true
            return
          }
        })
        if (!filter)newInputs.push(ele)
      })
      return newInputs
    }
    resetInputs() {
      if (this.binding.value !== this.binding.oldValue) this.getEffectiveInput()
    }
    getAppointInput() {
      this.el.querySelectorAll('')
    }
}
