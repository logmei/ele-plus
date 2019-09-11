<template>
  <div>
    <filter-operator :items="searchParams" @query="query"></filter-operator>
    <table-component 
    :loading="listLoading" 
    :table-data="tableData" 
    :clear-select-status="clearSelectStatus" 
    :table-columns="tableColumns" 
    :show-row-number="showRowNumber" 
    :authority="authority.operator" 
    :border="border"
    :fit="fit"
    @handleSelectionChange="handleSelectionChange" 
    @handleClick="handleClick" 
    />
    <pagination 
    v-show="total>0" 
    :total="total" 
    :page.sync="pageNum" 
    :limit.sync="pageSize" 
    :prev-text="prevText"
      :next-text="nextText"
    @pagination="getTableDataList" 
    />
    <DialogComponent v-if="dialogDefault"
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      :slide-out-type="slideType"
      @opened="dialogOpened"
      @closed="dialogClosed"
      @dragDialog="dialogDrag"
      @close="dialogClose"
    >
    <slot v-bind:row="row"></slot>
    </DialogComponent>
    <slot v-else name="detail" v-bind:row="row"></slot>
  </div>
</template>
<script>
import TableComponent from '../index.vue'
import Pagination from '../Pagination'
import FilterOperator from '../FilterOperator'
import DialogComponent from '../../CommonDialog'
export default {
  name:'ElpControllerTable',
  components: {
    TableComponent,
    Pagination,
    FilterOperator,
    DialogComponent
  },
  props: {
    dialogTitle: {
      type: String,
      required: false,
      default:''
    },
    slideType: {
      type: String,
      required: false,
      default: 'center'
    },
    tableDataInterface:{
      required: true
    },
    /**
     * 权限
     * {
     *  showDetail：true,//是否显示详细
     *  operator:true//是否可以操作
     * } */
    authority: {
      type: Object,
      required: false,
      default: ()=>{
        return {operator:false}
      }
    },
    reload: {
      type: Boolean,
      required: false,
      default: false
    },
    searchParams: {
      type: Array,
      required: true
    },
    tableColumns: {
      type: Array|Function,
      required: true
    },
    showRowNumber: {
      type: Boolean,
      required: false,
      default: false
    },
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    fit: {
      type: Boolean,
      required: false,
      default: true
    },
    prevText: {
      type: String,
      default: false
    },
    nextText: {
      type: String,
      default: false
    },
    dialogDefault: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  data() {
    return {
      tableData: [],
      clearSelectStatus: 0, // 状态值  发生变化清数据
      total: 0,
      listLoading: true,
      pageNum: 1,
      pageSize: 10,
      dialogVisible: false,
      row:null,
      search:{}
    }
  },
  watch: {
    reload: function() {
      if (this.reload) {
        this.pageNum = 1
        this.clearSelectStatus++
        this.getTableDataList()
      }
      console.log('table reload', this.clearSelectStatus)
    }
  },
  created() {
    // 初始化列表数据
    this.getTableDataList()
  },
  methods: {
    query(search){
      this.search = search
      this.getTableDataList()
    },
    // table数据
    getTableDataList() {
      // console.log('getTableDataList')
      this.listLoading = true
      this.getDataList()
      this.$emit('update:reload', false)
    },
    // 获取合同数据列表
    getDataList() {
      // if(Object.keys(this.search).length===0) this.search = this.searchParams.reduce((search,v,index)=>{
      //    search[v.name] = v.value
      //    return search
      //   },{})
      const params = {}
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      Object.assign(params, this.search)
      // console.log('params......',params)
      this.tableDataInterface(params).then(data => {
        // console.log('ContractTableDataInterface--', data)
        const result = data.result
        this.tableData = result.list
        this.total = result.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    // 列表点击  显示详细
    handleClick(row) {
      this.dialogVisible = true
      this.row = row
      this.$emit('handleClick', row)
    },
    // 选择
    handleSelectionChange(selectOptions) {
      this.$emit('handleSelectionChange', selectOptions)
    },
    reloadFun() {
      this.pageNum = 1
      this.getTableDataList()
    },
    dialogOpened(){
      this.$emit('dialogOpened')
    },
    dialogClosed(){
      this.$emit('dialogClosed')
    },
    dialogDrag(){
      this.$emit('dialogDrag')
    },
    dialogClose(){
      this.$emit('dialogClose')
    }
  }
}
</script>

