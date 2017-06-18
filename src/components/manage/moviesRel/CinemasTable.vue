<template>
    <el-table fit :data="data" border style="width: 100%" height="360" @selection-change="getSelect" >
       <el-table-column type="selection" width="40"></el-table-column>
       <el-table-column v-if="isShow" type="expand">
           <template scope="cinemas">
               <HouseTable :data="cinemas.row.houses" :addSession="addSession" :cinema="cinemas.row" :show="show"></HouseTable>
           </template>
       </el-table-column>
        <el-table-column align="center" prop="cinemaName" :show-overflow-tooltip="true" label="影院名" width="150"></el-table-column>
        <el-table-column align="center" prop="area" label="地区" width="80"></el-table-column>
        <el-table-column align="center" prop="address" label="地址" :show-overflow-tooltip="true" width="160"></el-table-column>
        <el-table-column align="center" prop="tel" label="电话" width="160"></el-table-column>
    </el-table>
</template>
<script>
    import HouseTable from "./HouseTable"
    
    export default{
        data:function(){
            return {
                house:[{field:"hName",text:"影厅名"},{field:"hName",text:"影厅名"}],
//                isShow:false
            }
        },
        components:{HouseTable},
        props:["data","getUpdateData","confirm","getSelect","isShow","addSession","show"]
    }
</script>