<template>
    <el-pagination
      @size-change=""
      @current-change="handleCurpage"
      :current-page.sync="moviesData.curpage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="moviesData.total">
    </el-pagination>
    
</template>


<script>
    import {mapState} from "vuex";
    export default {
        props:['show'],
        methods:{
            handleCurpage:function(val){
               let type=this.searchData.searchValue;
               let typevalue = this.searchData.value; 
                 this.show(val,type,typevalue);
            }
        },
        computed:{
            ...mapState({    moviesData:state=>state.moviesAll.moviesData,
            searchData:state=>state.moviesAll.searchData
               
        })
        }
    }
    
    
</script>


<style scoped>


</style>