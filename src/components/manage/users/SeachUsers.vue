<template>
        <el-input placeholder="请输入内容" v-model="input5">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="姓名" value="name"></el-option>
                <el-option label="电话" value="phNum"></el-option>
                <el-option label="email" value="email"></el-option>
                <el-option label="生日" value="time"></el-option>
            </el-select>
            <el-button slot="append" icon="search">查询</el-button>
        </el-input>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    export default {
        
  }
</script>
<style>

</style>