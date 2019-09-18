//获取参数值
export function getSearchParams(items,formItems){
  const search = formItems.reduce((search,v,index)=>{
    if(items[index].type === 'datepickerrange'){
      search.startDate = v.value[0]
      search.endDate = v.value[1]
    }else{
       search[v.name] = v.value
    }
    
    return search
 },{})
 return search
}