<template>
   <div class='style'>
       <el-pagination
      @size-change=""
      @current-change="handleCurpage"
      :current-page.sync="onhotData.curpage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="onhotData.total">
    </el-pagination>
   </div>
    
    
</template>


<script>
    import {mapState} from "vuex";
    export default {
        props:['showOnhot'],
        methods:{
            handleCurpage:function(val){
              
               let type=this.onhotSearchData.searchValue;
               let typevalue = this.onhotSearchData.value; 
                 this.showOnhot(val,type,typevalue);
            }
        },
        computed:{
            ...mapState({    onhotData:state=>state.moviesAll.onhotData,
             onhotSearchData:state=>state.moviesAll.onhotSearchData   
        })
        }
    }
    
    
</script>


<style scoped>
    .style{
        float:right;
        }

</style>