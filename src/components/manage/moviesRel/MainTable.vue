<template>
    <div>
        <el-table fit :data="data" border style="width: 100%" height="360" :ref="tableRef" @selection-change="addToSelect">
           <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="cName" label="电影名" width="180" fixed class="cName"></el-table-column>
            <el-table-column align="center" prop="type" label="类型" width="150"></el-table-column>
            <el-table-column align="center" prop="scor" label="评分" width="80"></el-table-column>
            <el-table-column align="center" prop="duration" label="时长" width="80"></el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="演员" width="200"  class="cName">
                <template scope="movie">
                    <span v-for="actor in movie.row.staffs" v-if="movie.row.staffs && actor.role != 'director'">{{actor.staffName + ","}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="area" :show-overflow-tooltip="true" label="地区" width="120"></el-table-column>
            <el-table-column align="center" label="上映日期" width="120">
                <template scope="prop">
                    <span>{{new Date(prop.row.releaseDate).toLocaleDateString()}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="240" v-if="isShow" fixed="right">
               <template scope="scope">
                <el-button icon="edit" @click="openCinemas(scope.row)" size="small" type="info">查看影院</el-button>
                <el-button icon="share" @click="getUpdateData(scope.row)" size="small" type="success">添加影院</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import store from "@/store";
    
    
    export default{
        data:function(){
            return {
                selectedRows:[]
            }
        },
        props:["show","data","isShow","getUpdateData","tableRef","addToSelect","openCinemas"],
        methods:{
            
        }
    }
    
</script>
<style scoped>
</style>