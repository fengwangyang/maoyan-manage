<template>
<el-card class="loginCard">
  <el-form :rules="rules" ref="loginForm" class="loginForm" :model="manager" label-width="80px">
    <el-form-item label="用户名" prop="userName">
        <el-input class="input" type="text" v-model="manager.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passWord">
        <el-input class="input"  type="password" v-model="manager.passWord"></el-input>
    </el-form-item>
    <el-form-item class="buttons">
        <el-button type="primary" class="subBtn" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
export default {
    data:function(){
        return {
            manager:{
                userName:"",
                passWord:""
            },
            rules:{
                userName:[
                    {required:true,message:"请输入用户名",trigger: 'blur'},
                    {pattern:/^\w{6,14}$/,message:"请输入6-14位下划线/字母/数字",trigger: 'blur'}
                ],
                passWord:[
                    {required:true,message:"请输入密码",trigger: 'blur'},
                    {pattern:/^\w{8,14}$/,message:"请输入8-14位下划线/字母/数字",trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm:function(ref){
            this.$refs[ref].validate((valid) => {
              if (valid) {
                ajax({
                    url:"/managers/find",
                    data:Object.assign({},this.manager,{findType:"exact",addSession:"0"}),
                    type:"post",
                    success:(data)=>{
                        if(data.length > 0){
                            this.$router.push("manage");
                        }else {
                             this.$message('用户名或密码错误');
                            return false;
                          }
                    }
                })
              } else {
                 this.$message('用户名或密码错误');
                return false;
              }
            });
        },
        resetForm:function(ref){
            this.$refs[ref].resetFields();
        }
    }
}
</script>
<style scoped>
    .loginCard{
        width: 400px;
        padding:36px 36px 0 36px;
        margin: auto;
        margin-top: 100px;
/*        background-color: azure;*/
    }
    .loginCard .input{
        width: 200px;
    }
    .buttons{
        padding-top: 20px;
        padding-left: 40px;
    }
    .subBtn{
        margin-right: 36px;
    }
</style>
