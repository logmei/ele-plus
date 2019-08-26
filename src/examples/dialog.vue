<template>
  <div>
  <elp-button @click="visible=true">弹出框</elp-button>
    <elp-dialog :visible.sync="visible" slideOutType="rightSide"></elp-dialog>
    
  </div>
</template>

<script>
import {ShortCut} from '../../packages'
  export default {
    directives:{
      ShortCut
    },
    data() {
      return {
        value:'',
        visible:false,
      }
    },
    methods: {
      onSubmit() {
        
      }
    }
  }
</script>