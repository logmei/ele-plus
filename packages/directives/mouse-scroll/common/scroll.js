  function mouseScroll(el, binding, vnode){
  /*监听鼠标滚动事件
    * 1.火狐的是：DOMMouseScroll;
    * 2.IE/Opera/Chrome：直接添加事件
    * */
  if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }//W3C
    window.onmousewheel=document.onmousewheel=function(e){
    var delta = 0;
      e=e || window.event;
      if(e.wheelDelta){//IE/Opera/Chrome//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        //自定义事件：编写具体的实现逻辑
        delta = e.wheelDelta/120
        if(window.opera) delta = -delta //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      }else if(e.detail){//Firefox//FF浏览器使用的是detail,其值为“正负3”
        //自定义事件：编写具体的实现逻辑
        delta = -event.detail/3;
      }
      if (delta)
          handle(delta);
    };//ie/opera/chrome


       
  var scrollFunc=function(e){
    var delta = 0;
      e=e || window.event;
      if(e.wheelDelta){//IE/Opera/Chrome//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        //自定义事件：编写具体的实现逻辑
        delta = e.wheelDelta/120
        if(window.opera) delta = -delta //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      }else if(e.detail){//Firefox//FF浏览器使用的是detail,其值为“正负3”
        //自定义事件：编写具体的实现逻辑
        delta = -event.detail/3;
      }
      if (delta)
          handle(delta);
    }
  //上下滚动时的具体处理函数
  function handle(delta) {
    if (delta <0){//向下滚动
      if(vnode.children[0].context.enlarge){
        //vnode.children[0].context.enlarge()
        vnode.data.on.downWheel()
      }
    }else{//向上滚动
      if(vnode.children[0].context.narrow){
        //vnode.children[0].context.narrow()
        vnode.data.on.upWheel()
      }
    }
  }

  }

  function removeMouseScroll(){
    window.onmousewheel=document.onmousewheel=null
  }
  
      
   

  export default {
    mouseScroll,
    removeMouseScroll
  }