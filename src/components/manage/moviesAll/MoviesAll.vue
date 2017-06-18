<template>
<div>
    <h2>电影管理</h2>
    <AddElement>
        
        
    </AddElement>
 
    
</div>


</template>
   
    
    



<script>

import {ajax} from "@/components/common/ajax";
import AddElement from "./AddElement";

import store from "@/store";
export default {
    created:function(){
        this.show();
    },
    methods:{
         show:function(page=1,type,value){
             let obj={};
             if(type){
                 obj[type]=value;
             }
             obj.page = page;
             obj.rows = 5;
        ajax({
            type:'get',
            url:'movies/find',
            data:obj,
            success:(data)=>{
               store.commit("MOVIESALL_DATA",data)
            }
        })  
        }
    },
    components:{
        AddElement
    }
   
        
}


</script>
<style></style>
<!--
<DeleteElement :show='show'></DeleteElement>
       <SearchElement :show='show'></SearchElement>
       <CinemaTable :show='show'></CinemaTable>
       <PageNation :show='show'></PageNation>-->
