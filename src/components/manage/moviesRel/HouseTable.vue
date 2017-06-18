<template>
  <div>
      
       <el-table fit :data="data">
           <el-table-column align="center" prop="hName" label="影厅名" width="100"></el-table-column>
           <el-table-column align="center" label="场次" >
               <template scope="house">
                   <Session v-for="(session,index) in house.row.sessions" :session="session" :key="index"></Session>
               </template>
           </el-table-column>
           <el-table-column align="center" label="操作" width="120">
               <template scope="house">
                   <AddSession :house="house.row" :cinema="cinema" :show="show"></AddSession>
               </template>
           </el-table-column>
       </el-table>
  </div>
 
</template>
<script>
    import Session from "./Session";
    import AddSession from "./AddSession";
    import {SWITCH_VISIBLE_SESSION,GET_HOUSE,GET_LINKED_CINEMA} from "@/store/moviesRel/mutations";
    import store from "@/store"

    export default{
        props:["data","cinema","show"],
        data(){
            return {
//                cinema:{},
            }
        },
        components:{Session,AddSession},
        methods:{
            confirmAddSession(){
                
            }
        }
    }
</script>