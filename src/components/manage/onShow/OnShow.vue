<template>
    <div style='text-align:center;'>
        <h2 class='h2tyle'>热播电影</h2>
        <SearchElement :showOnhot = 'showOnhot'></SearchElement>
        <AddElement :showOnhot='showOnhot' class='addstyle' :showMoviesData='showMoviesData'></AddElement>
        <DeleteElement :showOnhot = 'showOnhot'></DeleteElement>
        <OnshowTable :showOnhot = 'showOnhot'></OnshowTable>
        <Pagenation :showOnhot='showOnhot'></Pagenation>
     </div>
</template>
<script>
import {ajax} from "@/components/common/ajax";
import store from "@/store";
import AddElement from "./AddElement";
import OnshowTable from "./OnshowTable";
import Pagenation  from "./Pagenation";
import DeleteElement from "./DeleteElement";
import SearchElement from "./SearchElement";
export default{
    created:function(){
    this.showOnhot();  
    this.showMoviesData();
    store.commit('ONSHOWPAGESIZE',5);
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
                url:'/hotbroadcast/find',
                data:obj,
                success:(data)=>{
                    store.commit("ONSHOW_DATA",data);
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
        OnshowTable,AddElement,Pagenation,DeleteElement,SearchElement
    },
    
}

</script>
<style scoped>

.h2tyle{
        margin:10px auto;
        color:blue;
    }
    .addstyle{
         float:left;
         margin-left:20px;
        margin-top:10px;
     margin-bottom: 10px;
    }
</style>

