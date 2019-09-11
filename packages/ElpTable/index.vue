<template>
  <div class="tableClass">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      :border="border"
      :fit="fit"
      style="width: 100%"
      cell-class-name="columnClass"
      @row-click="handleClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="authority&&showSelection"
        type="selection"
        width="50"
      />
      <el-table-column
      v-if="showRowNumber"
      label="序号"
      type="index"
      fixed
      width = "50"
      />
      <el-table-column
        v-for="(item,index) in tableColumns"
        :key="index"
        :label="item.label"
        :fixed="item.fixed?item.fixed:false"
        :width="item.width?item.width:''"
        :min-width="item.minWidth?item.minWidth:120"
      >
        <template v-if="(item.authority === undefined)||(item.authority)" slot-scope="scope">
          <span v-if="item.valueType==='img'">
            <img v-for="(button,i) in item.value" :key="i" :style="button.style" :title="button.callBackFunName" :class="button.callBackFunName&&!rowClick?'img-class pointer-class':'img-class'" :src="button.src" @click="clickButton(scope.row,button.callBackFunName)">
          </span>
          <span v-if="item.valueType==='button'&& !rowClick" class="elp-operator-class">
            <el-button 
            v-for="(button,i) in item.value" 
            :key="i" 
            :type="button.entity.type" 
            :plain="button.entity.styleType==='plain'" 
            :round="button.entity.styleType==='round'" 
            :disabled="button.entity.styleType==='disabled'" 
            :icon="button.entity.icon?'el-icon-'+button.entity.icon:''"
            @click="clickButton(scope.row,button.callBackFunName)"
            >
            {{ button.label }}
            </el-button>
          </span>
          <span v-if="!item.valueType || (item.valueType&&item.valueType==='data')">
            
            <span v-if="(!scope.row[item.name].value || scope.row[item.name].value==='') && ( !scope.row[item.name].icon || scope.row[item.name].icon ==='')" slot="reference">
              ------
            </span>
            <span class="elp-table__cell" v-else-if="scope.row[item.name].icon && scope.row[item.name].icon !==''" slot="reference">
              <i :class="'el-icon-'+scope.row[item.name].icon"></i>
               <span class="elp-table__cell-value">{{ scope.row[item.name].value }}</span> 
            </span>
            <span v-else>
              <span v-if="!item.minWidth">
                 {{ scope.row[item.name].value }}
              </span>
              <el-popover
                v-else
                placement="bottom"
                trigger="hover"
                :content="String(scope.row[item.name].value)"
              >
                <span slot="reference"><span :class="item.minWidth?'cell-center-item':''">{{ scope.row[item.name].value }}</span></span>
              </el-popover>
            </span>

          </span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
 
/** 模板
 *authority:权限（默认为true）
  valueType:列中数据类型（默认data）TABLECOLUMNSTYPE中的类型
  label:列头名
  name：普通数据对应tableData中的字段
  formater：回调函数
  value:操作列
*/
/**
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
  { label: '编号', name: 'number', fixed: 'left' },
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
 */
import { getTypeOf } from '../utils/index.js'
export default {
  name:'ElpTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableColumns: {
      type: Array|Function,
      required: true
    },
    authority: {
      type: Boolean,
      required: false,
      default: false
    },
    showSelection: {
      type: Boolean,
      required: false,
      default: true
    },
    clearSelectStatus: {
      type: Number,
      required: false,
      default: 0
    },
    rowClick: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
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
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  watch: {
    tableData: {
      handler: 'initFilters'
      // deep: true
    },
    clearSelectStatus: function() {
      this.multipleSelection = []
    }
  },

  methods: {
    initFilters() {
      // console.log('this.tableData', this.tableData)
      this.tableData.forEach(data => {
        const cloumns = getTypeOf(this.tableColumns,'function') ? this.tableColumns(this) : this.tableColumns
        cloumns.forEach(v => {
          if (v.formater) {
            // console.log('tableformater', v.name, data[v.name])
            const value = v.formater(data[v.name],data)
            data[v.name] = typeof value === 'object' ? value : { value }
          } else {
            data[v.name] = { value : data[v.name] }
          }
        })
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', this.multipleSelection)
    },
    handleClick(row) {
      if (this.rowClick) this.$emit('handleClick', row)
    },
    clickButton(row, callBackFun) {
      console.log('this.row.callba', row, callBackFun)
      if (!this.rowClick) this.$emit(callBackFun, row)
    }
  }
}
</script>
<style lang="scss">
.tableClass{
    .columnClass{
        .cell{
           // min-width: 200px;
            white-space: nowrap;
        }
        .cell-center-item{
             width: 200px;
             display: inline-block;
        }
        .img-class{
            margin: 0 10px
        }
        .pointer-class{
            cursor: pointer;
        }

    }
}
</style>
