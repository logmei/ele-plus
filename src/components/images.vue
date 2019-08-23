<template>
<div>
  <p>dialogType:'self' 默认值，带有遮罩层的图片切换</p>
  <images-component :image-list="imgFiles"/>
  <p>:shadow="false" 无遮罩层的图片切换(默认值为true)</p>
  <images-component :image-list="imgFiles" :shadow="false"/>
  <p>dialogType:'images' 带有工具栏（放大缩小旋转）</p>
  <images-component :image-list="imgFiles" dialogType='images'/>
  <p>dialogType:'images' 带有工具栏（放大缩小旋转）不带遮罩</p>
  <images-component :image-list="imgFiles" dialogType='images'  :shadow="false"/>
</div>
  
</template>
<script>
import ImagesComponent from '../../packages/ImageList'
export default {
  components:{
    ImagesComponent
  },
  data(){
    return {
      imgFiles:[
        {
          title:'title-01',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=01d80d552ef025f54a6a2dff52432a98&imgtype=0&src=http%3A%2F%2Fi1.17173.itc.cn%2F2009%2Fkx%2F2009%2F06%2F16%2F20090616171420490.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=5781beb0f17d4f665d4cc20cb803775b&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Fsoft%2F2016%2F0102%2F092635_44907394.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=c9d6906dfc54e9a286c8cf3199072660&imgtype=0&src=http%3A%2F%2Fwww.sx198.com%2Fp%2F84%2Fimage%2F201611%2F1479608859183678447.gif'
            ]},
            {
          title:'title-02',
          list:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=2adb4cf9945d0ba46adca46f00b99644&imgtype=0&src=http%3A%2F%2Fimage.finance.china.cn%2Fupload%2Fimages%2F2014%2F0410%2F085000%2F0_2323627_580fd395d60d023a4cf8b45c31cd1218.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=4b8f8e2c2686d41a9e2ffcadce1c7721&imgtype=0&src=http%3A%2F%2Fimg3.ph.126.net%2F1KDLXCf_5HxC0KDAxUQZSg%3D%3D%2F2866541162838628463.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566558427557&di=8486823d19d99ae586d582985de6fb65&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201305%2F25%2F20130525153450_nHVaH.thumb.700_0.jpeg'
            ]}
      ]
    }
  }
}
</script>