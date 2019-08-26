import ElpDialog from './CommonDialog/index.js'
import ElpSearch from './Search/index.js'
import ElpSvgIcon from './SvgIcon/index.js'
import ElpButton from './Button/index.js'
import ShortCut from './directives/short-cut/index.js'
import DragImage from './directives/drag-images/index.js'
import ElpImageDialog from './ImageDialog/index.js'
import ElpImageList from './ImageList/index.js'
import ElpImageOfSelfDialog from './ImageDialog/ImageOfSelfDialog/index.js'
import ElpImagePage from './ImageDialog/ImagePage/index.js'
import ElpImagesDialog from './ImageDialog/ImagesDialog/index.js'

const components = {
  ElpDialog,
  ElpSearch,
  ElpSvgIcon,
  ElpButton,
  ElpImageDialog,
  ElpImageList,
  ElpImageOfSelfDialog,
  ElpImagePage,
  ElpImagesDialog
}
const directives = {
  ShortCut,
  DragImage
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
  ElpButton,
  ElpImageDialog,
  ElpImageList,
  ElpImageOfSelfDialog,
  ElpImagePage,
  ElpImagesDialog,
  ShortCut,
  DragImage
  
}