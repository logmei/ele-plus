### [代码仓库](https://github.com/logmei/ele-plus.git)
## 版本详细说明，请查看doc下面的版本文件
## 最新版本 v0.4.4
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
          ElpImageList,
          ElpImageOfSelfDialog,
          ElpImagePage,
          ElpImagesDialog,
          ShortCut,
          DragImage,
          MouseScroll,
          ElpCarousel,
          ElpControllerTable,
          ElpFilterOperator,
          ElpPagination,
          ElpTable,
          ConstantParams
    } from 'ele-plus'
    
    Vue.use(ElpDialog)
    Vue.use(ElpSearch)
    Vue.use(ElpSvgIcon)
    Vue.use(ElpButton)
    Vue.use(ElpImageDialog)
    Vue.use(ElpImageOfSelfDialog)
    Vue.use(ElpImagesDialog)
    Vue.use(ElpImageList)
    Vue.use(ElpImageOfSelfDialog)
    Vue.use(ElpImagePage)
    Vue.use(ElpImagesDialog)
    Vue.use(ShortCut)
    Vue.use(DragImage)
    Vue.use(MouseScroll)
    Vue.use(ElpControllerTable)
    Vue.use(ElpFilterOperator)
    Vue.use(ElpPagination)
    Vue.use(ElpTable)
    Vue.use(ConstantParams)
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
 > 使用之前先介绍一下静态变量ConstantsParam 
 ### 静态变量ConstantsParam 
 * 1、引入 import { ConstantParams } from 'ele-plus'
 * 2、变量内容
 ```js
 const constantParams = {
    name:'ConstantsParam',
    //tableColumns的数据类型
    TABLECOLUMNSTYPE : {
      IMAGE: {
        key: 'img',
        label: '图标',
        style: 'width:30px;height:30px'
      },
      BUTTON: {
        key: 'button',
        label: '操作',
        type: 'primary',
        styleType: 'plain'
      },
      DATA: {
        key: 'data'
      }
    },
    //filterOperator组件需要的items数据类型
    FILTERTYPE : {
      INPUT: {
        key: 'input',
        description: '输入框'
      },
      SELECT: {
        key: 'select',
        description: '选择框'
      },
      DATEPICKERRANGE: {
        key: 'datepickerrange',
        description: '日期范围',
        format: 'yyyy-MM-dd'
      },
      DATEPICKER: {
        key: 'datepicker',
        description: '日期',
        format: 'yyyy-MM-dd'
      },
      HIDDEN: {
        key: 'hidden',
        description: '隐藏输入框'
      }
    }
}
 ```
 ### elp-table组件
  
  
  #### 1、引入指令
  ```
  import {ElpTable} from 'ele-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      ElpTable
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(ElpTable)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| tableData  | 显示的数据  | Array | true | |
| tableColumns  | 表头和数据类型等 | Array| true | |
| showRowNumber  | 显示序号 | Boolean  | false | false|
| border | 竖线 | Boolean | false | false|
| loading | 是否显示加载中 | Boolean | false | false|
| rowClick | 是否触发行点击事件 | Boolean | false | false|
| authority | 是否有多选操作权限 | Boolean | false | false|
| clearSelectStatus | 清空多选框(监控该值发生改变会触发) |Number | false | 0
| fit | 列的宽度是否自撑开 | Boolean | false | true|
 #### 5、事件
  | 事件名 | 说明 | 参数 |
|------|------------|------------|
| handleClick  | 若rowClick设置为true,则触发，或rowClick设置为false,tableColumns中设置handleClick事件触发  | row |
| tableColumns设置的回调函数名  | tableColumns设置的回调函数名 | row |
| handleSelectionChange  | 多选框触发选择 | 多选框选中列表 |

 #### 6、tableColumns说明
 ##### js文件模板
 ```js
 /** 模板
 *authority:权限（默认为true）
  valueType:列中数据类型（默认data）TABLECOLUMNSTYPE中的类型
  label:列头名
  name：普通数据对应tableData中的字段
  formater：回调函数
  value:操作列
*/
import { ConstantParams } from 'ele-plus'
  const contractColumns = [
  {
    authority: true,
    valueType: ConstantParams.TABLECOLUMNSTYPE.IMAGE.key,
    label: ConstantParams.TABLECOLUMNSTYPE.IMAGE.label,
    name: '',
    value: [{
      src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
      callBackFunName: 'show1',
      alt: '图片1',
      style: ConstantParams.TABLECOLUMNSTYPE.IMAGE.style
    },
    {
      src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg',
      callBackFunName: 'show2',
      alt: '图片2',
      style: ConstantParams.TABLECOLUMNSTYPE.IMAGE.style
    }],
    fixed: 'left',
    width: 50
  },
  { label: '编号', name: 'number', fixed: 'left',formater:formaterIconV },
  { label: '名称', name: 'title', fixed: 'left', minWidth: 155 },
  { label: '使用名', name: 'name', fixed: 'left' },
  { label: 'ID', name: 'mechNo' },
  { label: '账号', name: 'account' },
  { label: '省份', name: 'province' },
  { label: '类型', name: 'signTypeVal' },
  { label: '金额', name: 'amount' },
  { label: '对应名', name: 'opptyName', minWidth: 155 },
  { label: '开始日期', name: 'startTime', formater, width: 140 },
  { label: '结束日期', name: 'endTime', formater, width: 140 },
  { label: '当前阶段', name: 'stateVal' },
  { label: '创建人', name: 'creator' },
  { label: '创建时间', name: 'createTime', formater, width: 140 },
  { label: '驳回原因', name: 'rejectReason' },
  {
    authority: true,
    valueType: ConstantParams.TABLECOLUMNSTYPE.BUTTON.key,
    label: ConstantParams.TABLECOLUMNSTYPE.BUTTON.label,
    name: '',
    value: [{
      label: '编辑',
      entity: ConstantParams.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'show3'
    },
    { label: '查看',
      entity: ConstantParams.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'show4'
    }
    ],
    fixed: 'right',
    width: 50
  },
  {
    authority: true,
    valueType: ConstantParams.TABLECOLUMNSTYPE.BUTTON.key,
    label: ConstantParams.TABLECOLUMNSTYPE.BUTTON.label,
    name: '',
    value: [{
      label: '查看',
      entity: ConstantParams.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'handleClick'
    }
    ],
    fixed: 'right',
    width: 100
  }
]
// 年月日时分
function formater(v) {
  const cFormat = '{y}-{m}-{d} {h}:{i}'
  const val = v === null || v === 'null' ? '------' : parseTimeMilliSecond(v, cFormat)
  // console.log('formater', val)
  return val
}
// 年月日
function formaterByDay(v) {
  const cFormat = '{y}-{m}-{d}'
  return v === null || v === 'null' ? '------' : parseTimeMilliSecond(v, cFormat)
}

function formaterIconV(v){
  return {value:v,icon:'edit'}
}
 ```
##### 结构说明：

| 参数 | 说明 | 类型 | 是否必填 | 
|-------|----------|-------|------|----|
|valueType| ConstantsParam.TABLECOLUMNSTYPE的数据key值| String | false(不添加默认为data) 
|authority|是否有权限查看|Boolean|false(不添加默认有权限)
|label|列标题名称| String | true |
|name |字段名|String|false(按钮或图标内容不需要)
|width|列宽|Number|false(默认为50)
|minWidth|最小列宽（若超过了宽度显示'...',并有Popover提示全部内容）|Number|false
|fixed|固定列|'left'或'right'|
|formater|转换数据的回调函数|Function|false|

 ##### formater回调函数
 * 1、参数：第一个参数为name对应的值，第二个参数为row
 * 2、普通数据
 ```js
 function formater(v){
     return v+'test'//或 return {value:v+'test'}
 }
 ```
 * 3、联合其他字段修改
 ```js
 function formaterNewname(v,row){
     return v + row.name//或 return {value:v + row.name}
 }
 ```
 * 4、带有icon的数据内容
 ```js
 function formaterIconV(v){
  return {value:v,icon:'edit'}//icon为icon的name
}
 ```
 ##### 图标
 * 1、valueType: ConstantsParam.TABLECOLUMNSTYPE.IMAGE.key（不可变）
 * 2、label: ConstantsParam.TABLECOLUMNSTYPE.IMAGE.label（列标题可修改）
 * 3、value:数组（可以设置多个图片），数据结构
 
 | 列名 | 说明 |
|--------|----------|
|src |图片地址|
|callBackFunName|回调函数名称（会抛出该事件）|
|alt|图片说明|
|style|图片样式（可修改）默认是：'width:30px;height:30px'
##### 按钮
 * 1、valueType: ConstantsParam.TABLECOLUMNSTYPE.BUTTON.key（不可变）
 * 2、label: ConstantsParam.TABLECOLUMNSTYPE.BUTTON.label（列标题可修改）
 * 3、value:数组（可以设置多个按钮），数据结构
 
 | 列名 | 说明 |
|--------|----------|
|label |名称|
|entity|按钮样式默认ConstantsParam.TABLECOLUMNSTYPE.BUTTON|
|callBackFunName|回调函数名称（会抛出该事件）|
* 4、ConstantsParam.TABLECOLUMNSTYPE.BUTTON

| 列名 | 说明 | 默认值|可选项|
|--------|----------|-------|-----|
|key | 不可修改 |'button'
|label|可修改、显示名称| '操作'
|type|可修改对应el-button中的type|'primary'
|styleType|可修改|'plain'|plain/round/disabled
|icon|可修改||对应elementUI中的icon名称

### elp-filter-operator组件
#### 1、引入指令
  ```
  import {ElpFilterOperator} from 'ele-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      ElpFilterOperator
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(ElpFilterOperator)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| items  | 内容  | Array | true | |

 #### 5、事件
  | 事件名 | 说明 | 参数 |
|------|------------|------------|
| query  | 点击回调和查询触发事件(已增加防抖)  | 查询条件已对象形式返回如：{name:'logmei',sex:'0'} |
#### 6、items的数据结构
| 字段名 | 类型 | 说明 | 
|--------|----------|-------|
|name | String |字段名称(用于后端交互)
|type|ConstantParams.FILTERTYPE的key值| INPUT/SELECT/DATEPICKERRANGE/DATEPICKER/HIDDEN
|label| String  |说明label
|value| String/Array | 默认值(type为datepickerrange时['2019-09-01','2019-09-06'])
|placeholder|String
|style|Object|样式
|className|String|类名
|list|Array|type为select时的列表[{key:'0',label:'女'},{key:'1',label:'男'}]
|format|String|日期控件格式转换
|valueFormat|String|设置返回值的格式
#### 7、slot
| name | 说明 | 参数 | 
|----------|--------|---------|
| buttons | 按钮默认是重置和查询 | 查询参数值
| otherButtons | 可以添加新的按钮 | 查询参数值
* 查询参数值结构示例
```js
const formItems = [
  {name: "name",value: "logmei"},
  {name: "sex",value: "女"},
  {name: "daterange",value: ["2019-09-01" , "2019-09-06"]},
  {name: "date",value: "2019-09-01"},
  {name: "guid",value: 0},
  ]
```
* 使用示例
```html
 <template v-slot:buttons="formItems">
   <el-button type="primary" @click="query(formItems)">查询</el-button>
 </template>
 <template v-slot:otherButtons="formItems">
    <el-button type="primary" @click="exportFile(formItems)">导出</el-button>
 </template>
```


### elp-controller-table组件
> elp-filter-operator、elp-table、elp-pagination、elp-dialog组合组件,通过tableColumns和searchParams来显示查询条件和列表，以提供的tableDataInterface接口来查询条件，重置、查询、分页自动绑定查询接口，行操作默认支持弹出框显示详情，弹出框保留slot来渲染内容；也可以通过设置dialogDefault来设置是否自己做具体的内容显示。（详细使用说明请往下看）

![](https://user-gold-cdn.xitu.io/2019/9/11/16d1e1196f51d5c6?w=1475&h=734&f=png&s=91758)

![](https://user-gold-cdn.xitu.io/2019/9/11/16d1e1392ba54dd1?w=1405&h=495&f=png&s=84539)
#### 1、引入指令
  ```
  import {ElpControllerTable} from 'ele-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      ElpControllerTable
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(ElpControllerTable)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| tableDataInterface  | 查询数据接口  | Function | true | |
| searchParams  | elp-filter-operator组件的items | Array| true | |
| tableColumns  | elp-table组件的tableColumns | Array  | true | |
| fit | 列的宽度是否自撑开 | Boolean | false | true|
|showRowNumber| 是否显示序号 | Boolean | false | false
|border | 是否显示竖线 | Boolena | false | false
| dialogTitle | elp-dialog需要的title | String | false | '' |
| slideType | elp-dialog弹出效果 | String | false | 'center'|
| dialogDefault | 查看详情是否使用默认弹出框true(使用默认弹出框)、false(使用detail插槽) | Boolean | false | true|
| authority | elp-table使用的是否有多选操作权限 | Object | false | {operator:false}|
| reload | 是否重新加载数据 |Boolean | false | false
| prevText | 分页上一页显示的text | String | false |''
| nextText | 分页下一页显示的test | String | false | ''
| pageSizes | 每页显示个数选择器的选项设置 | Array | false | [5, 10, 20, 30, 50]

 #### 5、事件
  | 事件名 | 说明 | 参数 |
|------|------------|------------|
| handleClick  | 若rowClick设置为true,则触发，或rowClick设置为false,tableColumns中设置handleClick事件触发  | row |
| handleSelectionChange  | 多选框触发选择 | 多选框选中列表 |
| dialogOpened  | 弹出框弹出事件
| dialogClosed  | 弹出框弹出事件
| dialogDrag  | 弹出框弹出事件
| dialogClose  | 弹出框弹出事件
#### 6、slot
| name | 说明 | 参数 | 
|----------|--------|---------|
| default | 默认弹出框内容 | row
| detail | 自定义内容 | row
| filterButtons | 按钮默认是重置和查询 | 查询参数值
| filterOtherButtons | 可以添加新的按钮 | 查询参数值
* 查询参数值结构示例
```js
const formItems = [
  {name: "name",value: "logmei"},
  {name: "sex",value: "女"},
  {name: "daterange",value: ["2019-09-01" , "2019-09-06"]},
  {name: "date",value: "2019-09-01"},
  {name: "guid",value: 0},
  ]
```
* 使用示例
```html
   <template v-slot:filterButtons="formItems">
      <el-button type="primary" @click="query(formItems)">查询</el-button>
   </template>
   <template v-slot:filterOtherButtons="formItems">
       <el-button type="primary" @click="exportFile(formItems)">导出</el-button>
   </template>
  <!-- 使用默认弹出框
   <template v-slot:default="row">
     {{row}}
   </template> -->
  <!-- 自己编写弹出框 -->
   <template v-slot:detail="row">
     <elp-dialog
     :visible.sync="dialogVisible"
     >
      first--------- {{row}}
     </elp-dialog>
   </template>
```
#### 7、示例
* 1、elp-controller-table使用示例
```html
<template>
  <elp-controller-table
  dialog-title="内容"
  border
  :table-data-interface="tableDataInterface"
  :search-params="searchParams"
  :table-columns="contractColumns"
  :show-row-number="true"
  :prevText="'上一页'"
  :nextText="'下一页'"
  :dialogDefault="false"
  @handleClick="dialogVisible=true"
  >
  <!-- 使用默认弹出框
    <template v-slot:default="row">
    {{row}}
  </template> -->
  <!-- 自己编写弹出框 -->
  <template v-slot:detail="row">
    <elp-dialog
    :visible.sync="dialogVisible"
    >
    {{row}}
    </elp-dialog>
  </template>
  </elp-controller-table>
</template>
<script>
import TableList from './interface.js'//接口
import contractColumns from './tableColumns.js'//table列说明
// import {ElpControllerTable} from 'ele-plus' //单独引用
export default {
  // components:{
  //   ElpControllerTable
  // },
  data(){
    return {
      dialogVisible:false,
      tableDataInterface:TableList,//接口
      contractColumns:contractColumns,//列说明
      //查询条件form中的内容说明
      searchParams:[
          {name:'name',type:'INPUT',label:'姓名',value:'',placeholder:'姓名1',style:{width:'200px'}},
          {name:'sex',type:'SELECT',label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}],className:'selectSex'},
          {name:'daterange',type:'DATEPICKERRANGE',label:'选择日期范围',value:['2019-09-01','2019-09-06'],format:'yyyy-MM-dd'},
          {name:'date',type:'DATEPICKER',label:'选择日期',value:'2019-09-01',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
          {name:'guid',type:'HIDDEN',label:'',value:'1'}
      ],
    }
  },
  methods:{
    // tableDataInterface:(params)=>{
    //   return TableList
    // }
  }
}
</script>
```
* 2、tableColumns.js示例
```js
import { parseTimeMilliSecond } from '@/utils/index.js' //日期格式化
import { ConstantParams } from 'ele-plus'
// 合同列表列
const contractColumns = [
  { label: '合同名称', name: 'title', fixed: 'left', minWidth: 155 ,formater: formaterIconV},
  { label: '客户名称', name: 'name', fixed: 'left' },
  { label: '机构ID', name: 'mechNo' },
  { label: '智慧脸账号', name: 'account' },
  { label: '省份', name: 'province' },
  { label: '签约类型', name: 'signTypeVal' },
  { label: '合同金额', name: 'amount' },
  { label: '对应商机', name: 'opptyName', minWidth: 155 },
  { label: '合同开始日期', name: 'startTime', formater: formaterByDay, width: 140 },
  { label: '合同截止日期', name: 'endTime', formater: formaterByDay, width: 140 },
  { label: '审批状态', name: 'approvalStateVal' },
  { label: '一级审批人', name: 'firApprPer', width: 100 },
  { label: '二级审批人', name: 'secApprPer', width: 100 },
  { label: '当前阶段', name: 'stateVal' },
  { label: '创建人', name: 'creator' },
  { label: '创建时间', name: 'createTime', formater, width: 140 },
  { label: '驳回原因', name: 'rejectReason' },
  {
    authority: true,
    valueType: ConstantParams.TABLECOLUMNSTYPE.BUTTON.key,
    label: ConstantParams.TABLECOLUMNSTYPE.BUTTON.label,
    name: '',
    value: [{
      label: '查看',
      entity: ConstantParams.TABLECOLUMNSTYPE.BUTTON,
      callBackFunName: 'handleClick'
    }
    ],
    fixed: 'right',
    width: 100
  }
]
// 年月日时分
function formater(v) {
  const cFormat = '{y}-{m}-{d} {h}:{i}'
  const val = v === null || v === 'null' ? '------' : parseTimeMilliSecond(v, cFormat)
  // console.log('formater', val)
  return val
}
// 年月日
function formaterByDay(v) {
  const cFormat = '{y}-{m}-{d}'
  return v === null || v === 'null' ? '------' : parseTimeMilliSecond(v, cFormat)
}

function formaterIconV(v){
  return {value:v,icon:'edit'}
}

export default contractColumns
```
* 3、interface.js示例
```js
export default function(params){
   console.log('params',params)
    return new Promise(resolve => {
      resolve(
        {
          'code': 0,
          'msg': 'success',
          'result': {
            'pageNum': 0,
            'pageSize': 5,
            'size': 2,
            'startRow': 1,
            'endRow': 1,
            'total': 20,
            'pages': 2,
            'list': [
              {
                'guid': '122749434e7e414d87ebbe6e1fd4c62d',
                'busGuid': '196749434e7e414d87ebbe6e1fd4c62d',
                'apprProGuid': 'ef86b64853354551ae9a363e7723a8bd',
                'number': '1000001',
                'title': null,
                'name': null,
                'mechNo': null,
                'account': null,
                'province': '北京',
                'signType': '1',
                'signTypeVal': '软件收费版',
                'amount': 1000,
                'opptyName': '渐酒空金榼 花困蓬瀛',
                'startTime': 1560156009000,
                'endTime': 1560156013000,
                'approvalState': 0,
                'approvalStateVal': '待审批',
                'firstLevelApprPer': null,
                'secondLevelApprPer': null,
                'state': 1,
                'stateVal': '签约',
                'creator': '于希德2',
                'createTime': 1560156002000,
                'rejectReason': null
              },
              {
                'guid': '196749434e72344d87ebbe6e1fd4c62d',
                'busGuid': '196749434e7e414d87ebbe6e1fd4c62d',
                'apprProGuid': 'ef86b64853354551ae9a363e7723a8bd',
                'number': '1000001',
                'title': 'title',
                'name': 'name',
                'mechNo': 'mechNo',
                'account': 'account',
                'province': '北京',
                'signType': '1',
                'signTypeVal': '软件收费版',
                'amount': 1000,
                'opptyName': '渐酒空金榼 花困蓬瀛',
                'startTime': 1560156009000,
                'endTime': 1560156013000,
                'approvalState': 0,
                'approvalStateVal': '待审批',
                'firstLevelApprPer': null,
                'secondLevelApprPer': null,
                'state': 1,
                'stateVal': '签约',
                'creator': '于希德2',
                'createTime': 1560156002000,
                'rejectReason': 'reason'
              }
            ],
            'prePage': 0,
            'nextPage': 1,
            'isFirstPage': false,
            'isLastPage': false,
            'hasPreviousPage': false,
            'hasNextPage': true,
            'navigatePages': 8,
            'navigatepageNums': [
              1
            ],
            'navigateFirstPage': 1,
            'navigateLastPage': 1,
            'lastPage': 1,
            'firstPage': 1
          }
        }
      )
    })
}
```

#### 7、[在线演示](https://codepen.io/logmei/pen/jONxOMV)

 
 
