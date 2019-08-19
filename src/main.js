import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {ElpDialog,ElpSearch,ElpSvgIcon,ElpButton} from '../packages'
import App from './App.vue'
/* eslint-disable */
// var {ElpDialog,ElpSearch,ElpSvgIcon} = ElePlus
console.log('elp Component ' , ElpDialog,ElpSearch,ElpSvgIcon)

Vue.use(ElpSvgIcon)
Vue.use(ElpDialog)
Vue.use(ElpSearch)
Vue.use(ElpButton)
// Vue.use(ElePlus)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
