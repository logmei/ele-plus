<template>
<div class="ssss">
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
  :pageSizes="[10,50,100]"
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
</div>

  
</template>
<script>
import TableList from './interface.js'//接口
import contractColumns from './tableColumns.js'//table列说明
// import ElpControllerTable from '../../../packages/ElpTable/ControllerTable' //单独引用
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
          {name:'name',type:'input',label:'姓名',value:'',placeholder:'姓名1',style:{width:'200px'}},
          {name:'sex',type:'select',label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}],className:'selectSex'},
          {name:'daterange',type:'datepickerrange',label:'选择日期范围',value:['2019-09-01','2019-09-06'],format:'yyyy-MM-dd'},
          {name:'date',type:'datepicker',label:'选择日期',value:'2019-09-01',format:'yyyy-MM-dd',valueFormat:'yyyy-MM-dd'},
          {name:'guid',type:'hidden',label:'',value:'1'}
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
<style lang="scss" scoped>
@import './css.scss';
.ssss /deep/ {
@include pagination
} 

</style>