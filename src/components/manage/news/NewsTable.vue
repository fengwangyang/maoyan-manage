<template lang="html">
   <el-table :datas="datas" borderstyle="width: 100%">
    
     <el-table-column label="日期" width="180">
      <template scope="scope">
        <span style="margin-left: 10px">{{datas.username}}</span>
      </template>
    </el-table-column>
    
     <el-table-column label="姓名" width="180">
      
       <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名:</p>
          <p>住址:</p>
          <div slot="reference" class="name-wrapper">
            <el-tag></el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    
    
    <el-table-column label="操作">
      <template scope="scope">
        <el-button size="small" >编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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