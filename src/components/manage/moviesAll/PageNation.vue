<template>

    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurpage"
      :current-page="moviesData.curpage"
      :page-sizes="[5, 6, 7]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="moviesData.total">
    </el-pagination>
    
<!--
    <el-pagination
      @size-change=""
      @current-change="handleCurpage"
      :current-page.sync="moviesData.curpage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="moviesData.total">
    </el-pagination>
-->
    
</template>


<script>
    import {mapState} from "vuex";
    import store from "@/store";
    export default {
        data:function(){
            return {
                size:"",
             }
        },
        props:['show'],
        methods:{
            handleCurpage:function(val){
               let type=this.searchData.searchValue;
               let typevalue = this.searchData.value; 
                 this.show(val,this.size,type,typevalue);
            },
            handleSizeChange:function(val){
                this.size = val;
                store.commit('PAGESIZE',val);
                let type=this.searchData.searchValue;
               let typevalue = this.searchData.value; 
                this.show(1,val,type,typevalue);
            }
        },
        computed:{
            ...mapState({    
            moviesData:state=>state.moviesAll.moviesData,
            searchData:state=>state.moviesAll.searchData
               
        })
        }
    }
    
    
</script>


<style scoped>


</style>