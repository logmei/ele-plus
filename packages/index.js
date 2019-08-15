import ElpDialog from './CommonDialog/index.js'
import ElpSearch from './Search/index.js'
import ShortCut from './directives/short-cut/index.js'
import ElpSvgIcon from './SvgIcon/index.js'

const components = {
  ElpDialog,
  ElpSearch,
  ElpSvgIcon
}
const directives = {
  ShortCut
}

const install = function(Vue){
  if(install.installed) return 
  install.installed = true
  Object.values(components).map(component => {
    Vue.component(component.name,component)
  })
  Object.values(directives).map(directive=>{
    Vue.directive(directive.name,directive)
  })
}

/** 支持使用标签方式引入 */
if(typeof window != 'undefined' && window.Vue){
  install(window.Vue)
}

export default install
export {
  ElpDialog,
  ElpSearch,
  ElpSvgIcon,
  ShortCut
}