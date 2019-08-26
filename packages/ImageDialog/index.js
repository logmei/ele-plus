import ElpImageOfSelfDialog from './ImageOfSelfDialog'
import ElpImagePage from './ImagePage'
import ElpImagesDialog from './ImagesDialog'

const components = [
  ElpImageOfSelfDialog,
  ElpImagePage,
  ElpImagesDialog
]

const install = Vue => {
  if(install.installed) return 
  install.installed = true
  components.forEach(component=>{
    Vue.component(component.name,component)
  })
}
/** 支持用标签方式引入 */
if(typeof window!== 'undefined' && window.Vue){
  install(window.Vue)
}

export default {
  name:'ElpImageDialog',
  install
}
export {
  ElpImageOfSelfDialog,
  ElpImagePage,
  ElpImagesDialog
}


