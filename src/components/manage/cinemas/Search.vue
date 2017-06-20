<template>
 <div>
   <div style="width:400px" class="searchInput">
    <el-input placeholder="请输入内容" v-model="value">
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:150px">
      <el-option label="影院名称" value="cinemaName"></el-option>
      <el-option label="影院地址" value="address"></el-option>
      <el-option label="影院电话" value="tel"></el-option>
      <el-option label="官方网站" value="webAdress"></el-option>
    </el-select>
    <el-button slot="append" icon="search" @click="searchCinemas"></el-button>
  </el-input>
  </div>
   <el-button
     style="float:left;marginLeft:10px"
          size="middle"
          type="primary"
          @click="refresh">刷新</el-button>
  </div>
    </template>
    
    <script>
    import {ajax} from "@/components/common/ajax"
    import store from "@/store"
    import {mapState} from "vuex"
    export default{
      props:["show"],
        data() {
           return {
                 value: '',
                 select: ''
                    }
                  },
    methods:{
        searchCinemas(){
            let obj={
            searchType:this.select,
            searchValue:this.value,
            };
         store.commit("SEARCH_TYPE",obj),
         this.show(1,this.pageSize,this.select,this.value);
       },
       refresh(){
        this.value="";
        this.select="";
         store.commit("SEARCH_TYPE",{});
        this.show(1,this.pageSize);
      },
     },
 computed:{
     ...mapState({
          pageSize:state=>state.cinemas.pageSize,
          value:state=>state.cinemas.inputValue,
        })
     }
    }
    </script>
    <style scoped>
     .searchInput{
        float:left;
      }
    </style>
