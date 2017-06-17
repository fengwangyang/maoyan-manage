<template>

   <div style="width:400px">
    <el-input placeholder="请输入内容" v-model="value">
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:150px">
      <el-option label="姓名" value="1"></el-option>
      <el-option label="性别" value="2"></el-option>
      <el-option label="年龄" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="search" @click="searchStudent"></el-button>
  </el-input>
</div>

    </template>
    
    <script>
    export default{
    
    }
    </script>
    <style></style>
