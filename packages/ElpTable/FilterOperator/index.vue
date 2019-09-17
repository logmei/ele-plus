<template>
  <el-form :inline="true" class="elp-operator-form-inline">
    <div class="elp-operator-params">
    <el-form-item v-for="(item,index) in items" :key="index" :label="item.label">
      <span v-if="item.type==='input'">
        <el-input 
        v-model="formItems[index].value" 
        :placeholder="item.placeholder?item.placeholder:item.label"
        :style="item.style ? item.style : ''"
        :class="item.className ? item.className : ''"
        :clearable="item.clearable !== undefined ? item.clearable : true"
        ></el-input>
      </span>
      <span v-else-if="item.type==='hidden'">
        <input v-model="formItems[index].value" type="hidden"/>
      </span>
      <span v-if="item.type==='select'">
        <el-select 
        v-model="formItems[index].value" 
        :placeholder="item.placeholder?item.placeholder:item.label"
        :style="item.style ? item.style : ''"
        :class="item.className ? item.className : ''"
        :clearable="item.clearable !== undefined ? item.clearable : true"
        >
        <el-option v-for="(option,i) in item.list" :key="i" :label="option.label" :value="option.key"></el-option>
      </el-select>
      </span>
      <span v-else-if="item.type==='datepickerrange'">
        <el-date-picker
        v-model="formItems[index].value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :format="item.format?item.format:'yyyy-MM-dd'"
        :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd'"
        :style="item.style ? item.style : ''"
        :class="item.className ? item.className : ''"
        :clearable="item.clearable !== undefined ? item.clearable : true"
        :picker-options="item.pickerOptions"
        >
       </el-date-picker>
      </span>
      <span v-else-if="item.type==='datepicker'">
        <el-date-picker
          v-model="formItems[index].value"
          type="date"
          :placeholder="item.placeholder?item.placeholder:item.label"
          :format="item.format?item.format:'yyyy-MM-dd'"
          :value-format="item.valueFormat?item.valueFormat:'yyyy-MM-dd'"
          :style="item.style ? item.style : ''"
          :class="item.className ? item.className : ''"
          :clearable="item.clearable !== undefined ? item.clearable : true"
          :picker-options="item.pickerOptions"
          >
        </el-date-picker>
      </span>
    </el-form-item>
    </div>
    
    
    <el-form-item class="elp-operator-buttons">
      <el-button @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
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
      },
      HIDDEN: {
        key: 'hidden',
        description: '隐藏输入框'
      }
    }
 * items:[Array]
 * 例如：
 * import { ConstantParams } from '../../../packages/index.js'
 *      [
          {name:'name',type:'input',label:'姓名',value:'',placeholder:'姓名1',style:{width:'200px'}},
          {name:'sex',type:'select',label:'性别',value:'0',list:[{key:'0',label:'女'},{key:'1',label:'男'}],className:'selectSex'},
          {
            name:'daterange'
            ,type:'datepickerrange'
            ,label:'选择日期范围'
            ,value:['2019-09-01','2019-09-06']
            ,format:'yyyy-MM-dd'
            ,clearable:false
            , pickerOptions:{
            disabledDate:(time) => {
                let currentTime = Date.now()
                let threeMonths = currentTime+24*60*60*1000
                return time.getTime() < Date.now() || time.getTime() > threeMonths
            }
          }
          },
          {name:'date'
          ,type:'datepicker'
          ,label:'选择日期'
          ,value:'2019-09-01'
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
 */
import { debounce } from '../../utils/index.js'

export default {
  name: 'ElpFilterOperator',
  props:{
    clearable:{
      type: Boolean,
      required: false,
      default: false
    },
    items:{
      type: Array,
      required: true
    }
  },
  data(){
    return {
      formItems:[]
    }
  },
  watch:{
    items:{
      handler:function(){
        this.setFormItemsValues()
      }
     ,
      deep:true
    }
  },
  created(){
    this.setFormItemsValues()
  },
  methods:{
    setFormItemsValues(){
      this.items.forEach((v,index)=>{
        this.$set(this.formItems,index,{name:v.name,value:v.value})
      })
    },
    //查询
    onSubmit(){
      this.query()
    },
    //重置
    onReset(){
      this.formItems.map((v,index)=>{
        v.value = this.items[index].value
        return v
      })
      this.query()
    },
    query:debounce(function(){
       const search = this.formItems.reduce((search,v,index)=>{
         if(this.items[index].type === 'datepickerrange'){
           search.startDate = v.value[0]
           search.endDate = v.value[1]
         }else{
            search[v.name] = v.value
         }
         
         return search
      },{})
      this.$emit('query',search)
    },1000,true)
  }
}
</script>
<style lang="scss" scoped>
.elp-operator-params{
  float: left;
  text-align: left;
}
.elp-operator-buttons{
  float: right;
}
</style>