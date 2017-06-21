<template>
    <div style='text-align:center;'>
        <h2 class='h2tyle'>热映电影</h2>
        <SearchElement :showOnhot = 'showOnhot'></SearchElement>
        
        <AddElement :showOnhot='showOnhot' class='divstyle' :showMoviesData='showMoviesData'></AddElement>
        <DeleteElement :showOnhot = 'showOnhot'></DeleteElement>
        <OnhotTable :showOnhot = 'showOnhot'></OnhotTable>
        <Pagenation :showOnhot='showOnhot'></Pagenation>
     </div>
</template>
<script>
import {ajax} from "@/components/common/ajax";
import store from "@/store";
import AddElement from "./AddElement";
import OnhotTable from "./OnhotTable";
import Pagenation  from "./Pagenation";
//import Pagenation  from "../preShow/Pagenation";
import DeleteElement from "./DeleteElement";
import SearchElement from "./SearchElement";
export default{
    created:function(){
    this.showOnhot(1,5);  
    this.showMoviesData();
    store.commit('ONHOTPAGESIZE',5);
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
                url:'/hotshowing/find',
                data:obj,
                success:(data)=>{
                    console.log(data);
                    store.commit("ONHOT_DATA",data);
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
        OnhotTable,AddElement,Pagenation,DeleteElement,SearchElement
    },
    
}

</script>
<style scoped>

.h2tyle{
        margin:10px auto;
        color:blue;
    }
.divstyle{
             float:left;
         margin-left:20px;
        margin-top:10px;
     margin-bottom: 10px;
    }
/*
    .divstyle{
        text-align:center;
        margin:10px;
    }
*/
</style>
