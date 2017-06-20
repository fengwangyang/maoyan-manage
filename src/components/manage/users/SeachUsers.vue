<template>
        <el-input placeholder="请输入内容" v-model="value">
            <el-select v-model="users" slot="prepend" placeholder="请选择">
                <el-option label="姓名" value="name"></el-option>
                <el-option label="电话" value="phNum"></el-option>
                <el-option label="email" value="email"></el-option>
                <el-option label="生日" value="time"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @click='search'>查询</el-button>
        </el-input>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import store from "@/store"
    import {mapState} from "vuex";
    import {FIND_USERS} from "@/store/users/mutations"
    export default {
        props:["show"],
        data:function(){
            return{
                users:"",
                value:""
            }
        },
        methods:{
            search:function(){
                let obj ={};
                obj.searchType = this.users;
                obj.searchValue = this.value;
                store.commit(FIND_USERS,obj);
                this.show(1,5,this.users,this.value);
            }
        }
  }
</script>
<style scoped="scoped">
 .el-select{
    width: 150px;
  }
    .el-option{
        width: 400px;
    }
</style>