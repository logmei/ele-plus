<template>
<div class="ssss">
 <el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="用户管理" name="first">
      <elp-controller-table
        ref="controllerTable"
        dialog-title="内容"
        border
        :table-data-interface="tableDataInterface"
        :search-params="searchParams"
        :table-columns="contractColumns"
        :show-row-number="true"
        :prevText="'上一页'+searchParams[4].value"
        :nextText="'下一页'"
        :dialogDefault="false"
        :reload.sync="reload[0].reload"
        :pageSizes="[10,50,100]"
        :clearable="true"
        @handle-click="dialogVisible=true"
        >
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
  </elp-controller-table>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
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
        :reload.sync="reload[1].reload"
        :pageSizes="[10,50,100]"
        @handle-click="dialogVisible=true"
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
   second-------- {{row}}
    </elp-dialog>
  </template>
  </elp-controller-table>
    </el-tab-pane>
  </el-tabs>
   <el-button type="primary" @click="chooseOne">下一家</el-button>
</div>

  
</template>
<script>
import TableList,{province,city,area} from './interface.js'//接口
import contractColumns from './tableColumns.js'//table列说明
// import ElpControllerTable from '../../../packages/ElpTable/ControllerTable' //单独引用
let count=0
export default {
  // components:{
  //   ElpControllerTable
  // },
  data(){
    return {
       activeName: 'first',
      reload:[{reload:false},{reload:false}],
      dialogVisible:false,
      tableDataInterface:TableList,//接口
      contractColumns:contractColumns,//列说明
      //查询条件form中的内容说明
      searchParams:[
          {name:'name',type:'input',label:'姓名',value:'',placeholder:'姓名1',style:{width:'200px'}},
          {name:'sex',type:'select',label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}],className:'selectSex'},
          {name:'province',type:'select',label:'省',value:'',inchain:{Selectinchain:true},list:[{key:'',label:'全部'},{key:'110000',label:'北京'},{key:'120000',label:'天津'}]},
          {name:'city',type:'select',label:'市',value:'',inchain:{Selectinchain:true,child:1,interface:city},list:[{key:'',label:'全部'}]},
          {name:'area',type:'select',label:'区',value:'',inchain:{child:2,interface:area},list:[{key:'',label:'全部'}]},
          {name:'province1',type:'select',label:'省1',value:'',inchain:{Selectinchain:true},list:[{key:'',label:'全部'},{key:'110000',label:'北京'},{key:'120000',label:'天津'}]},
          {name:'city1',type:'select',label:'市1',value:'',inchain:{Selectinchain:true,child:1,interface:city},list:[{key:'',label:'全部'}]},
          {name:'area1',type:'select',label:'区1',value:'',inchain:{child:2,interface:area},list:[{key:'',label:'全部'}]},
          {
            name:'daterange'
            ,type:'datepickerrange'
            ,label:'选择日期范围'
            ,value:undefined
            ,format:'yyyy-MM-dd'
            ,clearable:false
            , pickerOptions:{
                onPick:({minDate})=>{
                  // console.log('onPick',maxDate,minDate)
                  this.selectDate = minDate
                },
                disabledDate:(time) => {
                    let currentTime = new Date(this.selectDate)
                    const thirtyOne = 31*24*60*60*1000
                    const start = currentTime-thirtyOne
                    const end = start+62*24*60*60*1000
                    return time.getTime() > end || time.getTime() < start
                }
          }
          },
          {name:'date'
          ,type:'datepicker'
          ,label:'选择日期'
          ,value:undefined
          ,format:'yyyy-MM-dd'
          ,valueFormat:'yyyy-MM-dd'
          ,clearable:false
          , pickerOptions:{
            disabledDate:(time) => {
                return time.getTime() > Date.now()
            }
          }
          },
          {name:'guid',type:'hidden',label:'',value:count}
      ],
    }
  },
  methods:{
    // tableDataInterface:(params)=>{
    //   return TableList
    // }
    tabClick(params){
      // console.log('tabClick params...',params)
      this.reload.forEach((v,index)=>this.reload[index].reload=false)
      this.reload[params.index].reload=true
      // console.log('tab click reload..',this.reload)
    },
    chooseOne(){
      count++
      this.searchParams[4].value=count
      // console.log('searchParams',this.searchParams)
      this.$nextTick(()=>{
        this.reload[0].reload=true
      })
      
    },
    query(formItems){
      console.log('controllerTable',this.$refs.controllerTable.$refs.filterOperatorRef)
      this.$refs.controllerTable.$refs.filterOperatorRef.query()
      console.log('formItems',formItems)
    },
    exportFile(formItems){
       console.log('formItems',formItems)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css.scss';
.ssss /deep/ {
@include pagination
} 

</style>