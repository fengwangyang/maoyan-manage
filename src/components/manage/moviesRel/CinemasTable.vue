<template>
    <el-table fit :data="data" border style="width: 100%" height="400">
       <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="cinemaName" label="电影名" width="180" fixed></el-table-column>
        <el-table-column align="center" prop="area" label="地区" width="80"></el-table-column>
        <el-table-column align="center" prop="address" label="地址" width="160"></el-table-column>
        <el-table-column align="center" prop="tel" label="电话" width="160"></el-table-column>
        <el-table-column align="center" label="操作" width="150" v-if="isShow" fixed="right">
           <template scope="scope">
            <el-button icon="edit" @click="getUpdateData(scope.row)" size="small" type="info">查看影厅</el-button>
          </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default{
        data:function(){
            return {
                house:[{field:"hName",text:"影厅名"},{field:"hName",text:"影厅名"}],
                isShow:false
            }
        },
        props:["data","getUpdateData"]
    }
</script>