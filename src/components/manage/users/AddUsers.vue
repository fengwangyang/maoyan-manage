<template>
   <div>
    <el-button icon='plus' type="success" @click="dialogFormVisible = true">添加用户</el-button>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phNum" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-input v-model="form.time" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定添加</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    export default {
        data(){
            return {
                dialogFormVisible: false, 
                form:{
                    name:"",
                    phNum:"",
                    pwd:"",
                    email:"",
                    time:""
                }
            }
        },
        methods:{
            add(){
                
            }
        },
        
  }
</script>
<style>

</style>