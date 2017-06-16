<template>
<div style='text-align:center'>
    <h2 class='h2tyle'>电影管理</h2>
    <AddElement>
        
        
    </AddElement>
    <SearchElement :show='show'></SearchElement>
    <MoviesTable :show='show'></MoviesTable>
    <PageNation class='pagestyle' :show='show'></PageNation>
</div>


</template>
   
    
    



<script>

import {ajax} from "@/components/common/ajax";
import AddElement from "./AddElement";
import SearchElement from "./SearchElement";
import MoviesTable from "./MoviesTable";
import PageNation from "./PageNation";
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
        AddElement,MoviesTable,PageNation,SearchElement
    }
   
        
}


</script>
<style>
    .pagestyle{
        margin-top:20px;
        float:right;
    }
    .h2tyle{
        margin:10px auto;
        color:cornflowerblue;
    }


</style>
<!--
<DeleteElement :show='show'></DeleteElement>
       <SearchElement :show='show'></SearchElement>
       <CinemaTable :show='show'></CinemaTable>
       <PageNation :show='show'></PageNation>-->
