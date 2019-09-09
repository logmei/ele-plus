<template>
  <elp-controller-table
  dialog-title="内容"
  border
  :table-data-interface="tableDataInterface"
  :search-params="searchParams"
  :table-columns="contractColumns"
  :show-row-number="true"
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
          {name:'name',type:'INPUT',label:'姓名',value:'',placeholder:'姓名1'},
          {name:'sex',type:'SELECT',label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}]},
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