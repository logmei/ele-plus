### [代码仓库](https://github.com/logmei/ele-plus.git)
## 版本详细说明，请查看doc下面的版本文件
## 最新版本 v0.2.4
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
    import {
        ElpDialog,
        ElpSearch,
        ElpSvgIcon,
        ElpButton,
        ElpImageDialog,
        ElpImageOfSelfDialog,
        ElpImagesDialog,
        ElpImageList
    } from 'ele-plus'
    
    Vue.use(ElpDialog)
    Vue.use(ElpSearch)
    Vue.use(ElpSvgIcon)
    Vue.use(ElpButton)
    Vue.use(ElpImageDialog)
    Vue.use(ElpImageOfSelfDialog)
    Vue.use(ElpImagesDialog)
    Vue.use(ElpImageList)
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
> 绑定到父元素即可
 > * 指令名：keydown
 > * 修饰符：keyDown（回车和上下左右键）、arrow（上下左右键）、enter（回车键）、self（指定元素）
#### 接收值说明
 ##### 1、self（value接收值为id的值或id的数组）
  > 用于指定固定元素获取焦点
   >* 字符串：
```js
    //form中也可使用
  <el-form v-shortCut:keydown.keyDown.self="'aa'">
  <el-input id='aa'><el-input>
  <el-form>
```
    
   >* 数组：
  ```js
   <el-form v-shortCut:keydown.keyDown.self="['aa','bb','cc','dd']">
  ...
    <el-input id='aa'><el-input>
    <el-input id='bb'><el-input>
    <el-input id='cc'><el-input>
    <el-input id='dd'><el-input>
  ...
  <el-form>
```
##### 2、其他修饰符(主要用于固定列，并需要使用上下键获取上下行的相同位置元素焦点)
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
  //form中也可使用
  <el-form v-shortCut:keydown.enter>...<el-form>
  //可编辑表格中使用
  <el-table  v-shortCut:keydown.keyDown="shortCutObj">....</el-table>
  //定义变量
  data(){
    return {
      shortCutObj: {
        rowCount: 11,//值为一行的操作元素个数，用于上下键
        callBack: () => {//获取最后一个元素触发的回调函数
          return this.addRow()
        },
        parenClassName: 'el-table__body-wrapper', //父元素class下的所有操作元素
        ignore:['elpignore']//可以忽略元素： disabled、select、radio、checkbox、date、multi_select,elpignore (默认忽略：'radio', 'checkbox', 'disabled')
      },
    }
  }
```
  ### 防抖按钮：elp-button
  > 使用与el-button的使用方法一致,只是增加了防抖
  ### 图片组件 
  * #### 不带工具栏，支持上下切换的图片组件 ElpImageOfSelfDialog：
  > 引入方式：
   ```
   // 全局
    import {ElpImageOfSelfDialog} from 'ele-plus'
    Vue.use(ElpImageOfSelfDialog)
    //局部
    import {ElpImageOfSelfDialog} from 'ele-plus'
   export default {
       components: {
           ElpImageOfSelfDialog
       }
   }
```
  > ##### 接收的属性如下：
  > * 1、visible：[Boolean]，默认值false。是否显示 ``` visible.sync="dialogVisible"```
  > * 2、imageUrl：[String],必填项，
  > * 3、shadowType：[Boolean],默认值true（显示遮罩层）。是否显示遮罩层
  > * 4、imageStyle：[Object],默认值{height: '800px'}
  > * 5、imageList：[Array],必填项，结构可为['imgurl1','imgurl2'...]，也可为[{title:'title1',list:['imgurl1','imgurl2'...]}]
  > ##### 示例：
  ```js
    <elp-image-of-self-dialog
            :visible.sync="dialogVisible"
            :image-list="imageList"
            :shadow-type="shadow"
            append-to-body
            :image-url="src"
    />
     export default {
  data(){
    return {
      dialogVisible: false,
      shadow: true,
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=01d80d552ef025f54a6a2dff52432a98&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg',
      imageList:[
        {
          title:'title-01',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=01d80d552ef025f54a6a2dff52432a98&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg'
            ]},
            {
          title:'title-02',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=2adb4cf9945d0ba46adca46f00b99644&imgtype=0&src=http%3A%2F%2Fimage.finance.china.cn%2Fupload%2Fimages%2F2014%2F0410%2F085000%2F0_2323627_580fd395d60d023a4cf8b45c31cd1218.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=4b8f8e2c2686d41a9e2ffcadce1c7721&imgtype=0&src=http%3A%2F%2Fimg3.ph.126.net%2F1KDLXCf_5HxC0KDAxUQZSg%3D%3D%2F2866541162838628463.jpg'
            ]}
      ]
    }
  }
}     
  ```
  
![](https://user-gold-cdn.xitu.io/2019/8/26/16cccde6f0a078cc?w=956&h=637&f=png&s=734928)
* #### 带工具栏(放大、缩小、旋转、上下切换)的图片组件 ElpImagesDialog：
  > 引入方式：
```js
   // 全局
    import {ElpImagesDialog} from 'ele-plus'
    Vue.use(ElpImagesDialog)
    //局部
    import {ElpImagesDialog} from 'ele-plus'
   export default {
       components: {
           ElpImagesDialog
       }
   }
```
  > ##### 接收的属性如下：
  > * 1、visible：[Boolean]，默认值false。是否显示 ``` visible.sync="dialogVisible"```
  > * 2、imageUrl：[String],必填项，
  > * 3、shadowType：[Boolean],默认值true（显示遮罩层）。是否显示遮罩层
  > * 4、imageStyle：[Object],默认值{height: '800px'}
  > * 5、imageList：[Array],必填项，结构可为['imgurl1','imgurl2'...]，也可为[{title:'title1',list:['imgurl1','imgurl2'...]}]
  > ##### 示例：
  ```js
    <elp-images-dialog
          :visible.sync="dialogVisible"
          :image-list="imageList"
          :shadow-type="shadow"
          append-to-body
          :image-url="src"
    />
     export default {
  data(){
    return {
      dialogVisible: false,
      shadow: true,
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=01d80d552ef025f54a6a2dff52432a98&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg',
      imageList:[
        {
          title:'title-01',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=01d80d552ef025f54a6a2dff52432a98&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg'
            ]},
            {
          title:'title-02',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=2adb4cf9945d0ba46adca46f00b99644&imgtype=0&src=http%3A%2F%2Fimage.finance.china.cn%2Fupload%2Fimages%2F2014%2F0410%2F085000%2F0_2323627_580fd395d60d023a4cf8b45c31cd1218.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=4b8f8e2c2686d41a9e2ffcadce1c7721&imgtype=0&src=http%3A%2F%2Fimg3.ph.126.net%2F1KDLXCf_5HxC0KDAxUQZSg%3D%3D%2F2866541162838628463.jpg'
            ]}
      ]
    }
  }
}     
  ```
![](https://user-gold-cdn.xitu.io/2019/8/26/16cccf66a1b4dcff?w=1882&h=844&f=png&s=950502)
  * #### 单个图片组件包 ElpImageDialog：
  > 引入方式:
    ```js
     import {ElpImageDialog} from 'ele-plus'
        Vue.use(ElpImageDialog)
    ```
  > 包含的组件：ElpImageOfSelfDialog、ElpImagesDialog
  
   * #### 图片列表组件 ElpImageList：
  > 引入方式：
   ```js
     //全局
        import {ElpImageList} from 'ele-plus'
        Vue.use(ElpImageList)
     //或局部
       import {ElpImageList} from 'ele-plus'
       export default {
           components: {
               ElpImageList
           }
       }
```
  > ##### 接收的属性如下：
  > * 1、visible：[Boolean]，必填项，默认false。提供关闭子窗口的开关 ``` visible.sync="dialogVisible"```
  > * 2、dialogType：[String],默认值'self'。self:不带工具栏，images:带工具栏
  > * 3、shadow：[Boolean],默认值true（显示遮罩层）。是否显示遮罩层
  > * 4、imageStyle：[Object],默认值{height: '800px'}
  > * 5、imageList：[Array],必填项，结构可为[{title:'title1',list:['imgurl1','imgurl2'...]}]
  > * 6、imgsStyle：[Object],默认值{width:'250px',height:'170px'}，提供图片列表中的小图片样式
  > ##### 示例：
  ```js
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="默认" name="first">
        <p>dialogType:'self' 默认值，带有遮罩层的图片切换</p>
        <elp-image-list :visible.sync="tabs[0].visible" :image-list="imgFiles"/>
      </el-tab-pane>
      <el-tab-pane label="图片切换无遮罩层" name="second">
        <p>:shadow="false" 无遮罩层的图片切换(默认值为true)</p>
        <elp-image-list :visible.sync="tabs[1].visible" :image-list="imgFiles" :shadow="false"/>
      </el-tab-pane>
      <el-tab-pane label="带有工具栏" name="third">
        <p>dialogType:'images' 带有工具栏（放大缩小旋转）</p>
        <elp-image-list :visible.sync="tabs[2].visible" :image-list="imgFiles" dialogType='images'/>
      </el-tab-pane>
      <el-tab-pane label="带有工具栏，不带遮罩" name="fourth">
        <p>dialogType:'images' 带有工具栏（放大缩小旋转）不带遮罩</p>
        <elp-image-list :visible.sync="tabs[3].visible" :image-list="imgFiles" dialogType='images'  :shadow="false"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data(){
    return {
      activeName: 'first',
      tabs:[
        {name:'first',visible:false},
        {name:'second',visible:false},
        {name:'third',visible:false},
        {name:'fourth',visible:false}
      ],
      imgFiles:[
        {
          title:'title-01',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=01d80d552ef025f54a6a2dff52432a98&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=5781beb0f17d4f665d4cc20cb803775b&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Fsoft%2F2016%2F0102%2F092635_44907394.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=c9d6906dfc54e9a286c8cf3199072660&imgtype=0&src=http%3A%2F%2Fwww.sx198.com%2Fp%2F84%2Fimage%2F201611%2F1479608859183678447.gif'
            ]},
            {
          title:'title-02',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=2adb4cf9945d0ba46adca46f00b99644&imgtype=0&src=http%3A%2F%2Fimage.finance.china.cn%2Fupload%2Fimages%2F2014%2F0410%2F085000%2F0_2323627_580fd395d60d023a4cf8b45c31cd1218.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=4b8f8e2c2686d41a9e2ffcadce1c7721&imgtype=0&src=http%3A%2F%2Fimg3.ph.126.net%2F1KDLXCf_5HxC0KDAxUQZSg%3D%3D%2F2866541162838628463.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=8486823d19d99ae586d582985de6fb65&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201305%2F25%2F20130525153450_nHVaH.thumb.700_0.jpeg'
            ]}
      ]
    }
  }
}
</script>     
  ```
![](https://user-gold-cdn.xitu.io/2019/8/26/16cccfdb46a03f18?w=1905&h=750&f=png&s=532298)
* #### 支持mouseover时滚轮滚动时图片放大缩小，mouseout时取消事件
在线运行:https://codepen.io/logmei/pen/YzKZaRm

  ### 鼠标滚轮指令
  * 1、引入指令
  ```
  import {MouseScroll} from 'ele-plus'
  ```

  * 2、局部注册
  ```
  directives: {
      MouseScroll
    }
  ```
  * 3、全局注册
  ```
  Vue.use(MouseScroll)
  ``` 
  * 4、指令```v-mouseScroll```
  > 绑定事件：downWheel（向下滚动），upWheel（向上滚动）
  > 示例:
  ```
  <div 
    v-mouseScroll 
    @downWheel="downWheel" 
    @upWheel="upWheel"  
    >
    内容
    </div>

  ```


  
  
    
  
  
    
