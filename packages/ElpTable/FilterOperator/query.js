//获取参数值
export function getSearchParams(items,formItems){
  const search = formItems.reduce((search,v,index)=>{
    if(items[index].type === 'datepickerrange' && Array.isArray(v.value)){
      if(items[index].alias && Array.isArray(items[index].alias)){
        search[items[index].alias[0]] = v.value[0]
        search[items[index].alias[1]] = v.value[1]
      }else{
        search.startDate = v.value[0]
        search.endDate = v.value[1]
      }
     
    }else{
       search[v.name] = v.value
    }
    
    return search
 },{})
 return search
}