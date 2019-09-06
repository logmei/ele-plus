<template>
  <elp-controller-table
  dialogTitle="内容"
  :tableDataInterface="tableDataInterface"
  :searchParams="searchParams"
  :tableColumns="contractColumns"
  >
  <template v-slot:default="row">
    {{row}}
  </template>
  </elp-controller-table>
</template>
<script>
import TableList from './interface.js'
import contractColumns from './tableColumns.js'
// import ElpControllerTable from '../../../packages/ElpTable/ControllerTable'
export default {
  // components:{
  //   ElpControllerTable
  // },
  data(){
    return {
      tableDataInterface:TableList,
      contractColumns:contractColumns,
      searchParams:[
          {name:'name',type:'INPUT',label:'姓名',value:''},
          {name:'sex',type:'SELECT',label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}]},
          {name:'date',type:'DATEPICKER',label:'选择日期',value:['2019-09-01','2019-09-06'],format:'yyyy-MM-dd'}
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