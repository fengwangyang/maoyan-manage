<template>
  <div>
      <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
              <div>
      <el-input placeholder="请输入内容" v-model="input5">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="name"></el-option>
          <el-option label="电话" value="phNum"></el-option>
          <el-option label="邮箱" value="email"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
    </div>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
              <el-button type="warning">查询</el-button>
              <el-button type="success">增加</el-button>
          </div></el-col>
    </el-row>
   
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
          :formatter="formatter">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small" style="background:#20A0FF"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    export default {
        data(){
            return{
                name:"",
                phNum:"",
                email:"",
                _id:""
            }
        },
        created(){
            this.show()
        },
        methods:{
            show(){
                ajax({
                    type:"get",
                    url:"/users/find",
                    data:{},
                    success:(data)=>{
//                        console.log(data);
                    }
                });
            }
        }
  }
</script>
<style></style>
