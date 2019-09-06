<template>
  <div class="elp-carousel">
    <div
      class="elp-carousel__container" >
         <div class="item" v-for="item in operatItems" :key="item.index" @click="chooseIndex(item.index)">
              <h3>{{item.content}}</h3>
           </div>
      </div>
   
    <ul>
      <li
        v-for="(item,index) in items"
        :key="index"
        :class="[
          'elp-carousel__indicator',
          { 'is-active': item.index === activeIndex }]"
        @click="chooseIndex(item.index)">
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ElpCarousel',

  props: {
    height:{
      type:String,
      default:'350px',
      require:false
    },
    items: {
      type: Array,
      require: false,
      default:()=>{return [
        {index:0,content:'111'},
        {index:1,content:'222'},
        {index:2,content:'333'},
        {index:3,content:'444'},
        {index:4,content:'555'},
        {index:5,content:'666'}
        ]}
    } 
  },

  data() {
    return {
      operatItems: this.items,
      activeIndex: 1,
      containerWidth: 0
    };
  },
  methods: {
    chooseIndex(index){
      this.activeIndex = index
      let contentList = this.items.slice()
      if(index>1){
        const moveList = contentList.splice(0,index-1)
        contentList=[...contentList,...moveList]
      } else if (index === 0) {
        const move = contentList.splice(contentList.length-1,1)
        contentList=[...move,...contentList]
      }
      this.operatItems = contentList
      this.$emit('chooseIndex',index)
    }
  }
};
</script>
<style lang="scss" scoped>
.elp-carousel{
  .elp-carousel__container{
    width: 100%;
    display: flex;
    height: 350px;
    align-items: center;
    justify-content:flex-start;
    border: 1px solid greenyellow;
    overflow: hidden;
    flex-wrap: nowrap;
   
  .item:first-child{
     margin-left: 0;
  }
.item{
    transition: background 1s;
    cursor: pointer;
    float: left;
    width:33.33%;
    height: 300px;
    background: #eeeeee;
    flex: none;
    box-sizing: border-box;
    // padding: 20px;
    margin-left:20px;
  }
  .item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  }
  ul{
    display: flex;
    justify-content: center;
    .elp-carousel__indicator {
      cursor: pointer;
      list-style: none;
      width:32px;
      height:4px;
      background:rgba(0,0,0,1);
      border-radius:4px;
      opacity:0.1;
      margin: 0 4px;
      padding: 0;
  }
  .is-active{
    background:rgba(0,160,233,1);
    opacity: 1;
  }
  }
 
}

 
</style>
