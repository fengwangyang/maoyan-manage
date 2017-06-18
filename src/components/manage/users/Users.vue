<template>
<div>
        
    <h1>用户管理</h1>
      <UsersManage :show="show"></UsersManage>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
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
          </template>
        </el-table-column>
  </el-table>
  <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 8, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100">
        </el-pagination>
  </div>
<!--  <Page :show="show"></Page>-->
 </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import store from "@/store"
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
                    data:this.$store.state.users.findUsers,
                    success:(data)=>{
                        console.log(data);
                        this.tableData = data;
                    }
                })
            },
            handleSelectionChange(val){
                let removeData_id =[];
                for(let i=0;i<val.length;i++){
                    removeData_id.push(val[i]._id);
                    store.commit("DELETE_USERS",removeData_id);
                };
                
            }
        },
        components:{
            UsersManage
        }
  }
</script>
<style></style>

