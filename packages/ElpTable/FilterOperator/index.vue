<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item v-for="(item,index) in formItems" :key="index" :label="item.label">
      <span v-if="item.type==='INPUT'">
        <el-input v-model="item.value" :placeholder="item.label"></el-input>
      </span>
      <span v-if="item.type==='SELECT'">
        <el-select v-model="item.value" placeholder="item.label">
        <el-option v-for="(option,i) in item.list" :key="i" :label="option.label" :value="option.key"></el-option>
      </el-select>
      </span>
      <span v-if="item.type==='DATEPICKER'">
        <el-date-picker
        v-model="item.value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
    </el-date-picker>
      </span>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="onReset">重置</el-button>
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
      }
    }
 * items:[Array]
 * 例如：[
 * {name:'name',type:'INPUT',label:'姓名',value:'',default:''},
 * {name:'sex',type:'SELECT',label:'性别',value:'',default:[{key:'0',label:'女'},{key:'1',label:'男'}]},
 * {name:'date',type:'DATEPICKER',label:'选择日期',value:[],default:['2019-09-01','2019-09-06'],format:'yyyy-MM-dd'}
 * ]
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
  computed:{
    formItems(){
      return this.items
    }
  },
  methods:{
    //查询
    onSubmit:debounce(function(){
      const search = this.formItems.reduce((search,v,index)=>{
         search[v.name] = v.value
         return search
      },{})
      this.$emit('query',search)
    },1000,true),
    //重置
    onReset(){
      debugger
      this.formItems.map((v,index)=>{
        v.value = this.items[index].value
        return v
      })
    }
  }
}
</script>