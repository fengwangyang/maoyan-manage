<template>
    <el-button type="info" @click="dialogFormVisible = true" icon='plus'>添加</el-button>
    
    
    
    
    
  </template>
<script>
import {ajax} from "@/components/common/ajax";
    export default {
        porp:['showOnhot'],
        data:function(){
            return {
                showAdddata:''
            }
        },
        methods:{
            showAddData:function(){
                ajax({
                    type:"get",
                    url:"/movies/find",
                    data:{},
                    success:(data)=>{
                        this.showAdddata = data;
                    }
                        
                    
                    
                })
            }
        }
    }

</script>


<style scoped>




</style>