<template>
    
    <div class='divstyle'>
  <el-input placeholder="请输入内容" v-model="value" style='float:left;width:400px'>
    <el-select v-model="searchValue" slot="prepend" placeholder="电影中文名" style='width:120px'>
      <el-option label="电影中文名" value="cName"></el-option>
      <el-option label="类型" value="type"></el-option>
      <el-option label="区域" value="area"></el-option>
      
    </el-select>
    <el-button slot="append" icon="search" style='width:80px' @click='searchMoives'>搜索</el-button>
  </el-input>
  <el-button slot="append" type='primary' @click='emptySearch' style='float:left;marginLeft:20px'>刷新</el-button>
</div>
    
</template>


<script>
import store from "@/store";
     import {mapState} from "vuex";
export default {
    props:['showOnhot'],
    data:function(){
        return {
            value:'',
            searchValue:'cName'
        }
    },
    methods:{
        searchMoives:function(){
            let data={
                searchValue:this.searchValue,
                value:this.value
            }
             store.commit("ONHOT_SEARCHDATA",data);
            this.showOnhot(1,this.pageSize,this.searchValue,this.value);
    },
         emptySearch:function(){
             this.value='';
            this.searchValue = '';
            this.showOnhot(1,this.pageSize);
        store.commit("ONHOT_SEARCHDATA",'');
        }
    },
    computed:{
        ...mapState({
        pageSize:state=>state.moviesAll.onshowPagesize
    })
}
    }
</script>


<style scoped>

 .divstyle{
         float:left;
         margin-top:10px;
       margin-bottom: 10px;
    }


</style>