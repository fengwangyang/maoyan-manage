<template>
    
    <div style="float:right;width:800px">
  <el-input placeholder="请输入内容" v-model="value">
    <el-select v-model="searchValue" slot="prepend" placeholder="电影中文名" style='width:150px'>
      <el-option label="电影中文名" value="cName"></el-option>
      <el-option label="类型" value="type"></el-option>
      <el-option label="区域" value="area"></el-option>
    </el-select>
    <el-button slot="append" icon="search" style='width:100px' @click='searchMoives'></el-button>
  </el-input>
</div>
    
</template>


<script>
import store from "@/store";
export default {
    props:['show'],
    data:function(){
        return {
            value:'',
            searchValue:''
        }
    },
    methods:{
        searchMoives:function(){
            let data={
                searchValue:this.searchValue,
                value:this.value
            }
 store.commit("SHOW_SEARCH",data);
           let obj={}; if(this.searchValue=='cName' || this.searchValue == 'type'){
               console.log(0);
                 obj={
                   [this.searchValue]:this.value,
                   rows:5
               }
            }else{
                console.log(1);
                 obj={
                   [this.searchValue]:this.value,
                   rows:5,
                    findType:'exact'
            }   
        }
//            this.show(obj);
    }
}
}
</script>


<style scoped>




</style>