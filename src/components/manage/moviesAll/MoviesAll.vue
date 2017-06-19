<template>
<div style='text-align:center;margin:10px'>
    <h2 class='h2tyle'>电影管理</h2>
    <SearchElement :show='show'></SearchElement>
    <AddElement :show='show'></AddElement>
    <DeleteElement :show='show'></DeleteElement>
     <MoviesTable :show='show'></MoviesTable>
    <UpdateElement :show='show'></UpdateElement>
    <PageNation class='pagestyle' :show='show'></PageNation>
</div>
</template>
  <script>
import {ajax} from "@/components/common/ajax";
import AddElement from "./AddElement";
import DeleteElement from "./DeleteElement";
import SearchElement from "./SearchElement";
import MoviesTable from "./MoviesTable";
import PageNation from "./PageNation";
import UpdateElement from "./UpdateElement";
//import AddActors from "./AddActors";
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
        AddElement,MoviesTable,PageNation,SearchElement,DeleteElement,UpdateElement
    }        
}


</script>
<style scpoe>
    .pagestyle{
        margin-top:20px;
        float:left;
    }
    .h2tyle{
        margin:10px auto;
/*        color:cornflowerblue;*/
        color:#324057;
        
    }


</style>
