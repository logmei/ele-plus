<template>
  <el-form :inline="true" class="elp-operator-form-inline">
    <div class="elp-operator-params">
    <el-form-item v-for="(item,index) in items" :key="index" :label="item.label">
      <span v-if="item.type==='input'">
        <el-input 
        v-model="formItems[index].value" 
        :placeholder="item.placeholder?item.placeholder:item.label"
        :style="item.style ? item.style : ''"
        :class="item.className ? item.className : ''"
        ></el-input>
      </span>
      <span v-else-if="item.type==='hidden'">
        <input v-model="formItems[index].value" type="hidden"/>
      </span>
      <span v-if="item.type==='select'">
        <el-select 
        v-model="formItems[index].value" 
        :placeholder="item.placeholder?item.placeholder:item.label"
        :style="item.style ? item.style : ''"
        :class="item.className ? item.className : ''"
        >
        <el-option v-for="(option,i) in item.list" :key="i" :label="option.label" :value="option.key"></el-option>
      </el-select>
      </span>
      <span v-else-if="item.type==='datepickerrange'">
        <el-date-picker
        v-model="formItems[index].value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :format="item.format?item.format:'yyyy-MM-dd'"
        :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd'"
        :style="item.style ? item.style : ''"
        :class="item.className ? item.className : ''"
        >
       </el-date-picker>
      </span>
      <span v-else-if="item.type==='datepicker'">
        <el-date-picker
          v-model="formItems[index].value"
          type="date"
          :placeholder="item.placeholder?item.placeholder:item.label"
          :format="item.format?item.format:'yyyy-MM-dd'"
          :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd'"
          :style="item.style ? item.style : ''"
          :class="item.className ? item.className : ''"
          >
        </el-date-picker>
      </span>
    </el-form-item>
    </div>
    
    
    <el-form-item class="elp-operator-buttons">
      <el-button @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
/**
 * FILTERTYPE : {
      INPUT: {
        key: 'input',
        description: '输入框'
      },
      SELECT: {
        key: 'select',
        description: '选择框'
      },
      DATEPICKER: {
        key: 'datepicker',
        description: '日期范围',
        format: 'yyyy-MM-dd'
      },
      HIDDEN: {
        key: 'hidden',
        description: '隐藏输入框'
      }
    }
 * items:[Array]
 * 例如：
 * import { ConstantParams } from '../../../packages/index.js'
 *       [
 *        {name:'name',type:ConstantParams.FILTERTYPE.INPUT.key,label:'姓名',value:'',placeholder:'姓名1',style:{width:'200px'}},
          {name:'sex',type:ConstantParams.FILTERTYPE.SELECT.key,label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}],className:'selectSex'},
          {name:'daterange',type:ConstantParams.FILTERTYPE.DATEPICKERRANGE.key,label:'选择日期范围',value:['2019-09-01','2019-09-06'],format:'yyyy-MM-dd'},
          {name:'date',type:ConstantParams.FILTERTYPE.DATEPICKER.key,label:'选择日期',value:'2019-09-01',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
          {name:'guid',type:ConstantParams.FILTERTYPE.HIDDEN.key,label:'',value:'1'}
 *      ]
 */
import { debounce } from '../../utils/index.js'

export default {
  name: 'ElpFilterOperator',
  props:{
    items:{
      type: Array,
      required: true
    }
  },
  data(){
    return {
      formItems:[]
    }
  },
  created(){
    this.setFormItemsValues()
  },
  methods:{
    setFormItemsValues(){
      this.items.forEach((v,index)=>{
        this.$set(this.formItems,index,{name:v.name,value:v.value})
      })
    },
    //查询
    onSubmit(){
      this.query()
    },
    //重置
    onReset(){
      this.formItems.map((v,index)=>{
        v.value = this.items[index].value
        return v
      })
      this.query()
    },
    query:debounce(function(){
       const search = this.formItems.reduce((search,v,index)=>{
         search[v.name] = v.value
         return search
      },{})
      this.$emit('query',search)
    },1000,true)
  }
}
</script>
<style lang="scss" scoped>
.elp-operator-params{
  float: left;
  text-align: left;
}
.elp-operator-buttons{
  float: right;
}
</style>