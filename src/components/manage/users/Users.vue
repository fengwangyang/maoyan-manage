<template>
<div>
        
    <h1>用户管理</h1>
      <UsersManage></UsersManage>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
          
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码">
        </el-table-column>
         <el-table-column
          prop="phNum"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="time"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              icon='edit'
              type='info'
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="small"
              type="warning"
              icon='delete'
              @click="del(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
  </el-table>
<!--  <Page :show="show"></Page>-->
 </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
//    import store from "@/store"
//    import {mapState} from "vuex";
    import UsersManage from "./UsersManage"
//    import Page from "./Page"
    export default {
        data(){
            return {
                name:"",
                pwd:"",
                phNum:"",
                time:"",
                email:"",
                _id:"",
               tableData:"",
            }                
        },
        created(){
            this.show();
        },
        methods:{
            show(){
                ajax({
                    type:"get",
                    url:"/users/find",
                    data:{
                        
                    },
                    success:(data)=>{
                        console.log(data);
                        this.tableData = data;
                    }
                })
            },
            del(id){
                ajax({
                    type:"post",
                    url:"/users/del",
                    data:{
                        _id:id
                    },
                    success:function(){
                        this.show();
                    }.bind(this)
                });
            }
        },
        components:{
            UsersManage
        }
  }
</script>
<style></style>

