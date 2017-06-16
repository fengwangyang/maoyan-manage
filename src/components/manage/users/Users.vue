<template>

<!--      <UsersManage></UsersManage>-->
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phNum"
          label="电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
  </el-table>
 
</template>
<script>
    import {ajax} from "@/components/common/ajax"
//    import UsersManage from "./UsersManage"
    export default {
        data(){
            return {
                name:"",
                phNum:"",
                email:"",
                tabelData:[]
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
                        rows:5,
                        page:1
                    },
                    success:(data)=>{
//                        console.log(data);
                        this.tableData=data.rows;
                        console.log(this.tableData);
                    }
                })
            }
        },
        components:{
//            UsersManage
        }
  }
</script>
<style></style>

