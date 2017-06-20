<template>
    <el-table tooltip-effect="dark" fit :data="data" border height="330" style="width: 100%" @selection-change="getSelect" @expand="updateSessions">
       
       <el-table-column v-if="isShow" type="expand" class="houseTable">
           <template scope="cinemas">
               <HouseTable :updateSessions="updateSessions" :data="cinemas.row.houses" :addSession="addSession" :cinema="cinema" :show="show"></HouseTable>
           </template>
       </el-table-column>
       <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column align="center" prop="cinemaName" :show-overflow-tooltip="true" label="影院名" width="150"></el-table-column>
        <el-table-column align="center" prop="area" label="地区" width="80"></el-table-column>
        <el-table-column align="center" prop="address" label="地址" :show-overflow-tooltip="true" width="160"></el-table-column>
        <el-table-column align="center" prop="tel" label="电话" width="160"></el-table-column>
    </el-table>
</template>
<script>
    import HouseTable from "./HouseTable";
    import {mapState} from "vuex";
    import {ajax} from "@/components/common/ajax"
    
    export default{
        data:function(){
            return {
                houses:[{field:"hName",text:"影厅名"},{field:"hName",text:"影厅名"}],
                cinema:{},
            }
        },
        components:{HouseTable},
        props:["data","getUpdateData","confirm","getSelect","isShow","addSession","show"],
        methods:{
            updateSessions(row, expanded){
                if(expanded){
                    ajax({
                        url:"/cinemas/find",
                        data:{_id:row._id},
                        type:"post",
                        success:(data)=>{
                            let cinemas = this.editMovie.cinemas;
                            cinemas.map((val)=>{
                                if(val._id == row._id){
                                    val.houses = data.houses;
                                }
                            })
                            ajax({
                                url:"/linkedMovies/update",
                                data:{_id:this.editMovie._id,cinemas:JSON.stringify(cinemas)},
                                success:()=>{
                                    this.show();
                                }
                            })
                        }
                    })
                }
            }
        },
        computed:{
            ...mapState({
                editMovie:state=>state.moviesRel.editMovie
            })
        }
    }
</script>
<style scoped>

    .el-table__expanded-cell {
        padding: 0!important;
    }
</style>