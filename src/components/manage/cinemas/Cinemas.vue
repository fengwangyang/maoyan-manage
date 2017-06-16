<template>
    <div>
    <h3 class="cinemas_h3">院线管理</h3>
    <Search>
    </Search>
    <Add></Add>
    
    <el-button
          size="small"
          icon="edit"
          type="info"
          @click="handleEdit(scope.$index, scope.row)">增加</el-button>
        
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    
    <el-table-column
     type="selection"
     width="55">
    </el-table-column>
    
    <el-table-column
      label="影院名称"
      width="180">
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.cinemaName }}</span>
      </template>
    </el-table-column>
    
     <el-table-column
      label="影院地址"
      width="180">
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    
      <el-table-column
      label="影院电话"
      width="180">
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
    
      <el-table-column
      label="官方网站"
      width="180">
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.webAdress }}</span>
      </template>
    </el-table-column>
    
    
    
   
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          icon="edit"
          type="info"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
       
          
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import Search from "./Search"
    import Add from "./Add"
   
    export default{
    data(){
        return {
        tableData:"",
        }
    },
       created(){
        this.show()
    },
    methods:{
        show(){
                ajax({
            type:"get",
            url:"/cinemas/find",
            success:(data)=>{
              this.tableData=data;
                }
            })
        }
    },
    compnents:{
    Add,Search,
    }

}
 
</script>
<style scoped>
import 
.searchInput{
    float:"right";
    width:100px;
    }
.search{
    width:50px;
    }
    .cinemas_h3{
        width:200px;
        color:red;
        margin:auto;
    }
</style>
