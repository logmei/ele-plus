/**
 * 功能快捷键
 */
const FUN_KEY = {
  Arrow: ['upArrow', 'downArrow', 'rightArrow', 'leftArrow'],
  KeyDown: ['enter', 'upArrow', 'downArrow', 'rightArrow', 'leftArrow'],
  Enter: ['enter']
}

const KEY_CODES = {
  enter: {
    key: 13,
    method: 'nextChoose'
  },
  tab: {
    key: 9,
    method: 'nextChoose'
  },
  upArrow: {
    key: 38,
    method: 'upChoose'
  },
  downArrow: {
    key: 40,
    method: 'downChoose'
  },
  rightArrow: {
    key: 39,
    method: 'nextChoose'
  },
  leftArrow: {
    key: 37,
    method: 'preChoose'
  }

}
/**
 * 获取对应功能的methods
 * @param {String} Funkey :功能key
 */
function getMethodsByFunkey(Funkey) {
  const funs = FUN_KEY[Funkey].reduce((obj, k) => {
    const o = {}
    o[KEY_CODES[k].key] = KEY_CODES[k].method
    return Object.assign(obj, o)
  }, {})
  return funs
}

const METHODS_FUN = {
  Arrow: getMethodsByFunkey('Arrow'),
  KeyDown: getMethodsByFunkey('KeyDown'),
  Enter: getMethodsByFunkey('Enter')
}

export {
  FUN_KEY,
  KEY_CODES,
  METHODS_FUN,
  getMethodsByFunkey
}
