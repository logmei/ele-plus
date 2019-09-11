<template>
    <div class="circle" :style="styleObject">

    </div>
</template>
<script>
export default {
  data(){
    return {
      styleObject:{
        clip:'rect(0px,50px,100px,0px)'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    width: 100px;
    height: 100px;
    background: #eeeeee;
    position: absolute;
    clip:rect(0px,100px,100px,50px)
  }
  .circle{
    width:80px;
    height: 80px;
    border: 10px solid green;
    border-radius: 50px;
    position: absolute;
    clip:rect(0px,50px,100px,0px)
  }
</style>