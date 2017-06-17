<template>
    <div style='text-align:center'>
        <h2 class='h2tyle'>热映电影</h2>
        <OnhotTable :showOnhot = 'showOnhot'></OnhotTable>
        <AddElement :showOnhot='showOnhot'></AddElement>
     </div>
</template>


<script>
    import {ajax} from "@/components/common/ajax";
    import store from "@/store";
    import OnhotTable from "./OnhotTable";
    import AddElement from "./AddElement";
    export default{
        created:function(){
          this.showOnhot();  
        },
        methods:{
            showOnhot:function(page=1,type,value){
                let obj={};
                if(type){
                    obj[type]=value;
                }
                obj.page = page,
                obj.rows = 5
                ajax({
                    type:'get',
                    url:'/hotshowing/find',
                    data:obj,
                    success:(data)=>{
                        store.commit("ONHOT_DATA",data);
                    }

                })
            }
        },
        components:{
            OnhotTable,AddElement
        },

    }

</script>
<style>

.h2tyle{
        margin:10px auto;
        color:cornflowerblue;
    }

</style>
