<template>
  <div class='style'>
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurpage"
      :current-page="preshowData.curpage"
      :page-sizes="[5, 6, 7]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="preshowData.total">
    </el-pagination>
    
<!--
    <el-pagination
      @size-change=""
      @current-change="handleCurpage"
      :current-page.sync="preshowData.curpage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="preshowData.total">
    </el-pagination>
-->
    
  </div>
    
    
</template>


<script>
    import {mapState} from "vuex";
    import store from "@/store";
    export default {
        data:function(){
            return {
                size:0
            }
        },
        props:['showOnhot'],
        methods:{
           
            handleCurpage:function(val){
               let type=this.onhotSearchData.searchValue;
               let typevalue = this.onhotSearchData.value; 
                 this.showOnhot(val,this.size,type,typevalue);
            },
             handleSizeChange:function(val){
                 store.commit('PAGESIZE',val);
                 this.size = val;
                  let type=this.onhotSearchData.searchValue;
               let typevalue = this.onhotSearchData.value; 
            this.showOnhot(1,val,type,typevalue);
            }
        },
        computed:{
            ...mapState({    
            preshowData:state=>state.moviesAll.preshowData,
             onhotSearchData:state=>state.moviesAll.onhotSearchData   
        })
        }
    }
    
    
</script>
<style scoped>
    .style{
        float:left;
    }

</style>