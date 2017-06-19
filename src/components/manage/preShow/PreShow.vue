<template>
    <div style='text-align:center;margin:10px'>
        <h2 class='h2tyle'>即将上映</h2>
         <SearchElement :showOnhot = 'showOnhot'></SearchElement>
       
        <AddElement :showOnhot='showOnhot' class='style' :showMoviesData='showMoviesData'></AddElement>
        <DeleteElement :showOnhot = 'showOnhot'></DeleteElement>
        <PreshowTable :showOnhot = 'showOnhot'></PreshowTable>
        <Pagenation :showOnhot='showOnhot'></Pagenation>
     </div>
</template>
<script>
import {ajax} from "@/components/common/ajax";
import store from "@/store";
import AddElement from "./AddElement";
import PreshowTable from "./PreshowTable";
import Pagenation  from "./Pagenation";
import DeleteElement from "./DeleteElement";
import SearchElement from "./SearchElement";
export default{
    created:function(){
    this.showOnhot();  
    this.showMoviesData();
    },
    methods:{
        showOnhot:function(page=1,rows=5,type,value){
            let obj={};
            if(type){
                obj[type]=value;
            }
            obj.page = page,
            obj.rows = rows,
            ajax({
                type:'get',
                url:'/preonshow/find',
                data:obj,
                success:(data)=>{
                    store.commit("PRESHOW_DATA",data);
                }
             })
        },
        showMoviesData:function(page=1,rows=5){
                let obj={};
                obj.page=page;
                obj.rows=rows;
                 ajax({
                    type:"get",
                    url:"/movies/find",
                    data:obj,
                    success:(data)=>{   
                        store.commit('ONHOT_MOVIESDATA',data);
                    }
                })
            },
    },
    components:{
        PreshowTable,AddElement,Pagenation,DeleteElement,SearchElement
    },
    
}

</script>
<style>

.h2tyle{
        margin:10px auto;
        color:cornflowerblue;
    }
    .style{
        float:left;
        margin:10px;
    }
</style>


