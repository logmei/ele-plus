### 使用说明

* 1、引入指令
```
import shortCut from '@/directive/short-cut'
```

* 2、局部注册
```
 directives: {
    shortCut
  }
```
* 3、全局注册
```
 Vue.use(shortCut)
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
    