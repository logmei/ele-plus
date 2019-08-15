
/**
 * 操作方法
 * @param {ChooseByKeydownClass} chooseByKeyEntity ：按键功能实体
 */
function conChooseAction(chooseByKeyEntity) {
  function nextChoose(index) {
    if ((index + 1) >= chooseByKeyEntity.inputLen) {
      (chooseByKeyEntity.callBack)()
      // return
    }

    const index1 = index + 1
    choose(index1)
  }

  function preChoose(index) {
    if (index <= 0) return
    const index1 = index - 1
    choose(index1)
  }

  function upChoose(index) {
    if ((index - chooseByKeyEntity.rowCount) < 0) return
    const index1 = index - chooseByKeyEntity.rowCount
    choose(index1)
  }

  function downChoose(index) {
    if ((index + chooseByKeyEntity.rowCount) >= chooseByKeyEntity.inputLen) {
      (chooseByKeyEntity.callBack)()
      // return
    }
    const index1 = index + chooseByKeyEntity.rowCount
    choose(index1)
  }

  function choose(index) {
    window.setTimeout(chooseAction, 100, index)
  }
  function chooseAction(index) {
    if (chooseByKeyEntity.binding.modifiers.self) {
      appointElementFocus()
      return
    }
    const input = chooseByKeyEntity.inputs[index]
    chooseByKeyEntity.CURSOR_INDEX = index
    if (input) {
      // inputs[index].blur()
      input.focus()
    } else {
      chooseByKeyEntity.CURSOR_INDEX = 0
    }
  }
  const methods = {
    nextChoose,
    preChoose,
    upChoose,
    downChoose
  }
  return function(type, index) {
    methods[type](index)
  }
}
/**
 * 判断类型
 * @param {String} type : s类型字符串（'object','array','string','function','boolean','number','undefined','null'）
 */
function typeOf(type) {
  // const typeList = ['object','array','string','function','boolean','number','undefined','null']
  return function(val) {
    let typeOfVal = Object.prototype.toString.call(val)
    typeOfVal = typeOfVal.substring(8, typeOfVal.length - 1)
    return typeOfVal.toLowerCase() === type.toLowerCase()
  }
}
/**
 * 指定元素获取焦点（目前只支持id，后续增加更多支持）
 * @param {Object} ele:父元素
 * @param {Object} chooseByKeyEntity :操作对象
 */
function appointElementFocus(chooseByKeyEntity) {
  chooseByKeyEntity.el.querySelector(`#${chooseByKeyEntity.binding.value}`).focus()
}
/**
 * 是否匹配元素
 * @param {String} type :控件的类型
 */
function isMatchedDom(type) {
  switch (type) {
    case 'disabled':
      return function(ele) {
        return ele ? (ele.getAttribute(type) === true) : false
      }
    case 'readonly':
      return function(ele) {
        return ele ? (ele.getAttribute(type) === 'readonly') : false
      }
    case 'select':
      return function(ele) {
        return ele ? (ele.getAttribute(type) === 'readonly' || ele.parentNode.parentNode.className.indexOf('el-select') !== -1) : false
      }
    case 'radio':
      return function(ele) {
        return ele ? (ele.parentNode.parentNode.className.indexOf('el-radio') !== -1) : false
      }
    case 'checkbox':
      return function(ele) {
        return ele ? (ele.parentNode.parentNode.className.indexOf('el-checkbox') !== -1) : false
      }
    case 'date':
      return function(ele) {
        return ele ? (ele.parentNode.className.indexOf('el-date-editor') !== -1) : false
      }
    case '_multi_select_hidden':
      return function(ele) {
        return ele ? (ele.className.indexOf('el-select__input') !== -1 && ele.parentNode.parentNode.className.indexOf('el-select') !== -1) : false
      }
    case 'multi_select':
      return function(ele) {
        return ele ? ((ele.className.indexOf('el-select__input') !== -1 || ele.getAttribute('readonly') === 'readonly') && ele.parentNode.parentNode.className.indexOf('el-select') !== -1) : false
      }
  }
}
const IS_MATCH = {
  disabled: isMatchedDom('disabled'),
  readonly: isMatchedDom('readonly'),
  select: isMatchedDom('select'),
  radio: isMatchedDom('radio'),
  checkbox: isMatchedDom('checkbox'),
  date: isMatchedDom('date'),
  multi_select: isMatchedDom('multi_select'),
  _multi_select_hidden: isMatchedDom('_multi_select_hidden')
}
export {
  conChooseAction,
  typeOf,
  appointElementFocus,
  IS_MATCH
}
