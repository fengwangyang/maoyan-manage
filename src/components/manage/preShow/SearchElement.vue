<template>
    
    <div class='style'>
  <el-input placeholder="请输入内容" v-model="value" style='float:left;width:730px'>
    <el-select v-model="searchValue" slot="prepend" placeholder="电影中文名" style='width:150px'>
      <el-option label="电影中文名" value="cName"></el-option>
      <el-option label="类型" value="type"></el-option>
      <el-option label="区域" value="area"></el-option>
      <el-option label="上映地区" value="releaseArea"></el-option>
    </el-select>
    <el-button slot="append" icon="search" style='width:100px' @click='searchMoives'></el-button>
  </el-input>
  <el-button slot="append" icon="minus" type='info' @click='emptySearch' style='float:right'>清空</el-button>
</div>
    
</template>


<script>
import store from "@/store";
export default {
    props:['showOnhot'],
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
 store.commit("ONHOT_SEARCHDATA",data);
            this.showOnhot(1,this.searchValue,this.value);
            this.value='';
            this.searchValue='';
    },
         emptySearch:function(){
             this.value='';
            this.searchValue = '';
            this.showOnhot(1);
        store.commit("ONHOT_SEARCHDATA",'');
        }
    }
}
</script>


<style scoped>

 .style{
        float:left;
        margin:10px;
        width:830px;
    }


</style>