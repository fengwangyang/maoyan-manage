<template>
    <div>
         <el-table
            :data="preshowData"
            border
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="电影中文名" prop="cName"
              width="120" :show-overflow-tooltip=true>

            </el-table-column>
            <el-table-column
              prop="eName"
              label="电影英文名"
              width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="staffs"
              label="演职人员" width="120" :show-overflow-tooltip=true>
              <template scope='scope'>
                 <span v-for='actor in scope.row.staffs'>{{actor.staffName+","}}</span>
               </template>
              </el-table-column>
            <el-table-column
              prop="scor"
              label="评分" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="favor"
              label="喜欢" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="area"
              label="地区" width="120" :show-overflow-tooltip=true>
            </el-table-column>

            <el-table-column
              prop="year"
              label="年代(年份)" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="时长(分钟)" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="releaseDate"
              label="上映时间" width="120" :show-overflow-tooltip=true>
            </el-table-column>

            <el-table-column
              prop="releaseArea"
              label="上映地区" width="120" :show-overflow-tooltip=true>
            </el-table-column>

            <el-table-column
              prop="poster"
              label="图集" width="120" :show-overflow-tooltip=true>
            </el-table-column>
          </el-table>
        
     </div>
    
    
    
</template>
<script>
import store from "@/store";
import {mapState} from "vuex";
export default{
    methods:{
        handleSelectionChange(val) {
             let data = val;
             store.commit("ONHOT_DELETEDATA",data)
            }
       },
    computed:{
        ...mapState({
            preshowData:state=>state.moviesAll.preshowData.rows
        })
    }
}

</script>
<style scope>
    
    
</style>