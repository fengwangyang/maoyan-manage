<template lang="html">
      <el-row>
          <el-table>
              <el-table-column label='姓名'></el-table-column>
              <el-table-column label='性别'></el-table-column>
              <el-table-column label='年龄'></el-table-column>
              <el-table-column label='操作'></el-table-column>
          </el-table>
          
      </el-row>
</template>




<script>
    
export default {
        props:['datas'],
        data() {
      return {
        
      }
    },
    created:function(){
        console.log('ssss',this.datas)
    }
}
    
 
</script>




<style></style>