<template>
<div>
        
    <h2 class="usersH1">用户管理</h2>
      <UsersManage :show="show" class="usersInput" style="overflow:hidden"></UsersManage>
    <el-table
        style="marginTop:10px;"
        :data="tableData"
        border
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
           <el-button size="small"
              icon='edit'
              type='info' 
              @click="update(scope.$index, scope.row)">修改</el-button>
            <UpdatUsers></UpdatUsers>
          </template>
        </el-table-column>
  </el-table>
  <Page :show="show" ></Page>
 </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import store from "@/store"
    import {mapState} from "vuex"
    import UsersManage from "./UsersManage"
    import UpdatUsers from "./UpdatUsers"
    import {SHOW_DATA} from "@/store/users/mutations";
    import Page from "./Page"
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
            this.show(1,5);
        },
        methods:{
            show(page,row,type,val){
                let obj={};
                if(type){
                    obj[type]=val
                }
                obj.rows = row;
                obj.page = page;
                ajax({
                    type:"get",
                    url:"/users/find",
                    data:obj,
                    success:function(data){
                        console.log(data.rows);
                        this.tableData=data.rows;
                        store.commit('SHOW_DATA',data);
                    }.bind(this)
                })
            },
            handleSelectionChange(val){
                let removeData_id =[];
                for(let i=0;i<val.length;i++){
                    removeData_id.push(val[i]._id);
                    store.commit("DELETE_USERS",removeData_id);
                };
            },
            update(index,rows){
//                console.log(index);
//                console.log(rows);
//                this.dialogFormVisible=true;
                store.commit('RENDERER_USERS',rows);
                store.commit("SET_UPDATEVISIBLE",true);
                console.log(this.$store.state.users.updateVisible);
            },
        },
        components:{
            UsersManage,Page,UpdatUsers
        }
  }
</script>
<style scoped="scoped">
    .usersH1{
        color: blue;
        margin-top: 10px;
        text-align: center
    }
    .usersInput{
        margin-top: 20px;
        margin-left: 10px
    }
  
</style>

