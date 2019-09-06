import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElePlus from '../packages'
// import {ElpDialog,ElpSearch,ElpButton,ElpImageDialog,ElpImageList,ElpSvgIcon} from '../packages'
// 
import App from './App.vue'
/* eslint-disable */
// var {ElpDialog,ElpSearch,ElpSvgIcon} = ElePlus
// console.log('elp Component ' , ElpDialog,ElpSearch,ElpSvgIcon)

// Vue.use(ElpSvgIcon)
// Vue.use(ElpDialog)
// Vue.use(ElpSearch)
// Vue.use(ElpButton)
// Vue.use(ElpImageDialog)
// Vue.use(ElpImageList)
// Vue.use(MouseScroll)
Vue.use(ElePlus)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
