<template>
<template>
   <div>
       <h2>电影管理</h2>
       <AddElement :show='show'></AddElement>
       
       
       
       
       
   </div>
    
    




</template>
<script>
//import {ajax} from "@/common/ajax";
import AddElement from "./AddElement";
export default {
//    methods:{
//        show:function(page=10){
//            ajax({
//                type:'get',
//                url:'/moives/find',
//                data:{},
//                success:(data)=>{
//                    store.commit("CINEMA_DATA",data);
//                }
//            })
//        }
//    },
    components:{
        AddElement
//        ,DeleteElement,SearchElement,CinemaTable,PageNation
    }
}
    
</script>
<style scoped>

</style>

<script>






</script>
<style></style>
<!--
<DeleteElement :show='show'></DeleteElement>
       <SearchElement :show='show'></SearchElement>
       <CinemaTable :show='show'></CinemaTable>
       <PageNation :show='show'></PageNation>-->
