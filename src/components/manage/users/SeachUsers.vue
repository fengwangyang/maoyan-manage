<template>
<div>
        <el-input placeholder="请输入内容" v-model="value" style="width:400px">
            <el-select v-model="users" slot="prepend" placeholder="请选择" style="width:150px;">
                <el-option label="姓名" value="name"></el-option>
                <el-option label="电话" value="phNum"></el-option>
                <el-option label="email" value="email"></el-option>
                <el-option label="生日" value="time"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @click='search'>查询</el-button>
        </el-input>
        <el-button slot="append" type='info' @click='refresh' style='margin-left:10px'>刷新</el-button>
    </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import store from "@/store"
    import {mapState} from "vuex"
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
                store.commit('FIND_USERS',obj);
                this.show(1,this.pageSize,this.users,this.value);
            },
            refresh(){
                this.value="";
                store.commit("FIND_USERS",{});
                this.show(1,this.pageSize);
      },
        },
        computed:{
        ...mapState({
                  pageSize:state=>state.cinemas.pageSize,
       })
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