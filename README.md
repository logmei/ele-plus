# ele-plus

## 安装
```
npm install ele-plus -S
```

### 引入ElePlus
#### 完整引入
```
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import ElePlus from 'ele-plus'
import 'ele-plus/lib/ele-plus.css'
Vue.use(ElePlus)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

#### 按需引入
```
import {ElpDialog,ElpSearch,ElpSvgIcon} from 'ele-plus'
Vue.use(ElpDialog)
Vue.use(ElpSearch)
Vue.use(ElpSvgIcon)
```
## 组件使用说明
### 弹出框：elp-dialog
> 增加了滑出效果
#### 使用与el-dialog的使用方法一致，只是增加了滑出效果的属性slideOutType
* 默认显示方式，居中显示：center 
* 从顶部滑出，居中显示：top
* 从底部滑出，居中显示：bottom 
* 从右侧滑出，居中显示：right
* 从左侧滑出，居中显示：left 
* 从右侧滑出，贴近边缘：rightSide
* 从左侧滑出，贴近边缘：leftSide 
* 从顶部滑出，贴近边缘：topSide
#### 示例
```js
    <el-button @click="visible=true">点击显示弹出框</el-button>
    <elp-dialog :visible.sync="visible" title="标题" slideOutType="rightSide">弹出框内容</elp-dialog>
```
### 搜索框
> 该组件包括：输入框和搜索按钮；支持回车键删除完内容之后查询、存在内容回车查询、点击搜索按钮进行查询，增加防抖
#### 示例
```js
 <elp-search v-model="value"></elp-search>
```
### 按键获取焦点指令
* 1、引入指令
```
import {ShortCut} from 'ele-plus'
```

* 2、局部注册
```
 directives: {
    ShortCut
  }
```
* 3、全局注册
```
 Vue.use(ShortCut)
``` 
* 4、指令```v-shortCut```
 > ##### 1.0版本
 > * 指令名：keydown
 > * 修饰符：keyDown（回车和上下左右键）、arrow（上下左右键）、enter（回车键）、self（指定元素）
#### 接收值说明
 >##### 1、self（value接收值为id的值或id的数组）
   >* 字符串：
    ```js
    v-shortCut:keydown.keyDown.self="'aa'"
    ```
   >* 数组：```js
   v-shortCut:keydown.keyDown.self="['aa','bb','cc','dd']"
    ```
>##### 2、其他修饰符
   >* Number类型：值为一行的操作元素个数，用于上下键
   ```js
    v-shortCut:keydown.keyDown="10"
    v-shortCut:keydown.arrow="10"
  ```
   >* 可变值：用于重置光标位置
 ```js
    v-shortCut:keydown.keyDown="s"
    v-shortCut:keydown.arrow="s"
    v-shortCut:keydown.enter="s"
  ```
   >* Object：
   
 ```js
 shortCutObj: {
    rowCount: 11,//值为一行的操作元素个数，用于上下键
    callBack: () => {//获取最后一个元素触发的回调函数
      return this.addRow()
    },
    parenClassName: 'el-table__body-wrapper', //父元素class下的所有操作元素
    ignore:[]//需要忽略的元素  disabled、select、radio、checkbox、date、multi_select (默认忽略：'radio', 'checkbox', 'disabled')
  },
  ```
    
