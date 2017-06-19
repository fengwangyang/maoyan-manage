<template>
   <div class='style'>
        <el-pagination
      @size-change=""
      @current-change="handleCurpage"
      :current-page.sync="onshowData.curpage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="onshowData.total">
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
            ...mapState({    onshowData:state=>state.moviesAll.onshowData,
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