<template>
   <div class='style'>
    <el-pagination

      @size-change="handleSizeChange"
      @current-change="handleCurpage"
      :current-page="onhotData.curpage"
      :page-sizes="[5, 6, 7]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="onhotData.total">
    </el-pagination>
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
                 store.commit('ONHOTPAGESIZE',val);
                 this.size = val;
                  let type=this.onhotSearchData.searchValue;
               let typevalue = this.onhotSearchData.value; 
            this.showOnhot(this.onhotData.curpage,val,type,typevalue);
            
        },
        },
        computed:{
            ...mapState({    
                onhotData:state=>state.moviesAll.onhotData,
            
            onhotSearchData:state=>state.moviesAll.onhotSearchData   
        })
        }
    }
 </script>


<style scoped>
   

</style>