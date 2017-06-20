<template>
<div>
        <el-input placeholder="请输入内容" v-model="value" style="width:400px;float:left;marginLeft:10px" >
            <el-select v-model="users" slot="prepend" placeholder="请选择" style="width:120px;">
                <el-option label="姓名" value="name"></el-option>
                <el-option label="电话" value="phNum"></el-option>
                <el-option label="email" value="email"></el-option>
                <el-option label="生日" value="time"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @click='search'>搜索</el-button>

        </el-input>
        <el-button type='primary' @click='refresh' style='float:left;marginLeft:20px'>刷新</el-button>
    </div>
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
                users:"name",
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

 
</style>