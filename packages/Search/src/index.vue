<template>
  <div class="search">
    <el-input
      v-model.trim="searchValue"
      :placeholder="placeholder"
      style="width:200px"
      @keyup.8.native="handleFilterByEmpty"
      @keyup.enter.native="handleFilterEnter"
    />
    <div class="search-icon"><elp-svg-icon icon-class="search" @click="handleFilter" /></div>
  </div>
</template>
<script>
import { debounce } from '../../utils/index.js'
export default {
  name:'ElpSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  computed: {
    searchValue: {
      get: function() {
        return this.value
      },
      set: function(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    // 查询
    handleFilter() {
      if (this.searchValue !== '') { this.$emit('search', this.searchValue) }
    },
    handleFilterEnter: debounce(function() {
       //console.log('handleFilterEnter', this.searchValue)
      if (this.searchValue !== '') { this.$emit('search', this.searchValue) }
    }, 1000,true),
    // 若内容为空则重新查询
    handleFilterByEmpty: function(e) {
       //console.log('handleFilterByEmpty', this.searchValue)
      if (this.searchValue === '' && e.target.value) { this.$emit('search', this.searchValue) }
    }

  }
}
</script>
<style lang="scss" scoped>
.search{
    display: flex;
    align-self: center;
    height: 38px;
    .el-input{
        line-height: 20px;
    }
    .search-icon{
        margin: 0 10px;
        line-height: 34px;
        color: #dcdfe6;
        cursor: pointer;
    }
}
</style>
