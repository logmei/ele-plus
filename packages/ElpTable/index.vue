<template>
  <div class="tableClass">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      border
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
          <span v-if="item.valueType==='button'&& !rowClick">
            <el-button v-for="(button,i) in item.value" :key="i" :type="button.entity.type" :plain="button.entity.styleType==='plain'" @click="clickButton(scope.row,button.callBackFunName)">{{ button.label }}</el-button>
          </span>
          <span v-if="!item.valueType || (item.valueType&&item.valueType==='data')">
            <span v-if="(!scope.row[item.name] || scope.row[item.name]==='')" slot="reference">
              ------
            </span>
            <span v-else>
              <span v-if="!item.minWidth">
                {{ scope.row[item.name] }}
              </span>
              <el-popover
                v-else
                placement="bottom"
                trigger="hover"
                :content="String(scope.row[item.name])"
              >
                <span slot="reference"><span :class="item.minWidth?'cell-center-item':''">{{ scope.row[item.name] }}</span></span>
              </el-popover>
            </span>

          </span>

        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>

export default {
  name:'ElpTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableColumns: {
      type: Array,
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
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  watch: {
    tableData: {
      handler: 'initFilters',
      deep: true
    },
    clearSelectStatus: function() {
      this.multipleSelection = []
    }
  },

  methods: {
    initFilters() {
      // console.log('this.tableData', this.tableData)
      this.tableData.forEach(data => {
        this.tableColumns.forEach(v => {
          if (v.formater) {
            // console.log('tableformater', v.name, data[v.name])
            data[v.name] = v.formater(data[v.name])
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
