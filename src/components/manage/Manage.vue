
<template>
<div class="student">
	<el-row type="flex" justify="space-between" class="row">
  			<el-col>
  				<h2 style="margin-top:6px">猫眼电影后台管理系统</h2>
  			</el-col>
  			<el-col :span="8">
	  				<el-menu theme="dark" class="el-menu-demo" mode="horizontal" :router=true>
				  	<el-menu-item index="">欢迎{{userName}}</el-menu-item>
				  	<el-menu-item index="/" @click='logout'>注销</el-menu-item>
				  	</el-menu>
  			</el-col>
        </el-row>
<el-row class="tac">
  <el-col :span="4"  class="left">
       <el-menu  :router=true>
       <el-menu-item index="users"><i class="el-icon-setting"></i>用户管理</el-menu-item>
        <el-menu-item index="on_hot"><i class="el-icon-setting"></i>热映管理</el-menu-item>
      <el-menu-item index="on_show"><i class="el-icon-setting"></i>热播管理</el-menu-item>
      <el-menu-item index="news"><i class="el-icon-setting"></i>资讯管理</el-menu-item>
      <el-menu-item index="movies_all"><i class="el-icon-setting"></i>电影管理</el-menu-item>
      <el-menu-item index="movies_rel"><i class="el-icon-setting"></i>电影院线匹配管理</el-menu-item> 
      <el-menu-item index="cinemas"><i class="el-icon-setting"></i>电影院线管理</el-menu-item>
      <el-menu-item index="pre_show"><i class="el-icon-setting"></i>即将上映</el-menu-item>
    </el-menu>
  </el-col>
  
  <el-col :span="20" class="right">
  
  <router-view></router-view>
	</el-col>
	
</el-row>
 <el-row  :span="24" class="footer">@版权所有</el-row>
</div>
  



</template>
<script>
    import {ajax} from "@/components/common/ajax"
    export default{
        data:function(){
            return {
                userName:"",
            }
        },
        created:function(){
          
            console.log(0)
        },
        methods:{
            getSession:function(){
                ajax({
                    url:"getSession",
                    type:"post",
                    success:(data)=>{
                        if(data.userName){
                            this.userName = data.userName;
                        }else{
                            this.$router.push("/");
                        }
                    }
                })
            },
            logout:function(){
                ajax({
                    url:"/logout",
                    success:()=>{
                        this.$router.push("/");
                    }
                })
            }
        },
        watch:{
            "$route":function(nextPath){
                if(nextPath.path != "/"){
                    console.log(nextPath)
                }
            }
        }
    }

</script>
<style scoped>

	.row{
		background-color:#324057
	}
	h2{
		color:white;
		padding:10px;
	}
    .left{
		background-color:#EFF2F7;
		height:520px;
	}
	.right{
		height:400px;
	}
	.pagechange{
		margin-left:30px;
		margin-top:20px;
	}

	.student{
		width:100%;
		height:520px;
		
	}
	.footer{
		height:50px;
		background-color:#324057;
		text-align:center;
		line-height:50px;
		color:white;
	}
</style>
