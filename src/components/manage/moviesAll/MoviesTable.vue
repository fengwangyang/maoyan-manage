<template>
    <div>
        <el-table
    :data="moviesData"
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
    
    <el-table-column label="操作">
      <template scope="scope" :show-overflow-tooltip=true>
        <el-button type='info' icon='edit' @click="updateData(scope.row)">修改</el-button>
        
      </template>
    </el-table-column> 
  </el-table>
    </div>
    
    
</template>


<script>
import {ajax} from "@/components/common/ajax";
import store from "@/store";
import {mapState} from "vuex";
    
export default {
    props:['show'],
    data:function(){
      return  {
        
        dialogFormVisible:false
        
        }
    },
    methods:{
        updateData:function(rows){
            
            ajax({
                url:'/movies/find',
                type:'get',
                data:{_id:rows._id},
                success:(data)=>{
                    store.commit("MOVIESALL_UPDATEDATA",data);
                    store.commit("MOVIESALL_UPDATEDIV",true);
                }
            })      
        },
        //选择要删除的数据保存在store中
         handleSelectionChange(val) {
             let newarry = [];
             for(let i =0;i<val.length;i++){
                 newarry.push(val[i]._id);
             }
             let data = val;
             store.commit("MOVIESALL_DELETEDATA",data)
      }
    },
    computed:{
        ...mapState({
        moviesData:state=>state.moviesAll.moviesData.rows
    })
    }
}

</script>




<style scoped>



</style>