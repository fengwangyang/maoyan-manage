<template>
    
    <div class='deletestyle'>
  <el-input placeholder="请输入内容" v-model="value" style='float:left;width:730px'>
    <el-select v-model="searchValue" slot="prepend" placeholder="电影中文名" style='width:150px'>
      <el-option label="电影中文名" value="cName"></el-option>
      <el-option label="类型" value="type"></el-option>
      <el-option label="区域" value="area"></el-option>
    </el-select>
    <el-button slot="append" icon="search" style='width:100px' @click='searchMoives'></el-button>
  </el-input>
  
  <el-button slot="append" icon="minus" type='info' @click='emptySearch' style='float:right'>清空</el-button>
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

       this.show(1,this.searchValue,this.value);
    },
         emptySearch:function(){
             this.value='';
            this.searchValue = '';
            this.showOnhot(1);
        store.commit("SHOW_SEARCH",'');
        }
    }
}
</script>


<style scoped>

 .deletestyle{
        float:left;
        margin:10px;
        width:830px;
    }


</style>