
import ElpSvgIcon from './index.vue'

ElpSvgIcon.install = Vue=>{
  Vue.component(ElpSvgIcon.name,ElpSvgIcon)
}
const req =require.context('./svg',false,/\.svg$/)
const requireAll = requireContext=> requireContext.keys().map(requireContext)
requireAll(req)
export default ElpSvgIcon
