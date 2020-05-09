<template>
<div>
  <elp-table
  :table-data="tableData" 
  :table-columns="tableColumns" 
  :authority="true" 
  :columnExpand="true">
  <template v-slot:expand="row">
    {{row.signTypeVal}}
  </template>
  </elp-table>
</div>
  
</template>
<script>
import TableList from './interface.js'//接口
import contractColumns from './tableColumns.js'//table列说明
export default {
  data(){
    return {
      tableData:[],
      tableColumns:contractColumns
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
       TableList().then(data => {
        // console.log('ContractTableDataInterface--', data)
        const result = data.result
        this.tableData = result.list

      })
    }
  }
}
</script>