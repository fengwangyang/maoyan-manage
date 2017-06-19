<template>
   <div class="add">
    <el-button icon='plus' type="success" @click="dialogFormVisible = true">添加</el-button>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :before-close="close">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        
        <el-form-item label="电话" prop="phNum">
          <el-input v-model="ruleForm.phNum"></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        
        <el-form-item label="出生日期" prop="time">
          <el-input v-model="ruleForm.time"></el-input>
        </el-form-item>
        
        <el-form-item label="Email"  prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add('ruleForm')">确定添加</el-button>
        </el-form-item>
      </el-form>
      
      
    </el-dialog>
    </div>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    export default {
        props:["show"],
        data(){
            return {
                dialogFormVisible: false, 
                ruleForm:{
                    name:"",
                    phNum:"",
                    pwd:"",
                    email:"",
                    time:""
                },
                rules:{
                    name:[
                        {required: true, message: '请输入姓名', trigger: 'blur' },
                        {pattern:/^[a-zA-Z]{6,}$/,message: '请输入正确格式（26位英文字母，最少输入6个字符）', trigger: 'blur'}
                    ],
                    phNum:[
                        {required: true, message: '请输入手机号', trigger: 'blur' },
                        {pattern:/^1[0-9]{10}$/,message: '请输入正确手机号（11位阿拉伯数字，1开头）', trigger: 'blur'}
                    ],
                    pwd:[
                        {required: true, message: '请输入密码', trigger: 'blur' },
                        {pattern:/^.{8,}$/,message: '请输入正确格式（任意字符,最少输入8位）', trigger: 'blur'}
                    ],
                    time:[
                        {required: true,message: '请输入生日）', trigger: 'blur'},
                        {pattern:/^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/,message: '请输入正确格式（1900-1-1）', trigger: 'blur'}
                    ],
                    email:[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ]
                    
                }
            }
        },
        methods:{
            
            add(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认添加该数据?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                        ajax({
                            type:"post",
                            url:"users/add",
                            data:this.ruleForm,
                            success:function(){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.show();
                                this.close();
                            }.bind(this)
                        });
                       }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });          
                        }); 
                    } else {
                        return false;
                    }
                });
            },
            close(){
                this.dialogFormVisible = false
            }
                
        }
    }
</script>
<style>

</style>