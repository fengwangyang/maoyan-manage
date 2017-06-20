
<template>
<div class="student">
	<el-row type="flex" justify="space-between" class="row">
  			<el-col>
                <div class="topTitle">
                    <h2>猫眼电影后台管理系统</h2>
                    <p>MAOYAN Background Manage System</p>
                </div>
  			</el-col>
  			<el-col :span="8" class="menu">
	  				<el-menu theme="dark" class="el-menu-demo menu" mode="horizontal" :router=true>
				  	<el-menu-item index="" >欢迎{{userName}}</el-menu-item>
				  	<el-menu-item index="/" @click='logout'>注销</el-menu-item>
				  	</el-menu>
  			</el-col>
        </el-row>
<el-row class="tac">
  <el-col :span="4"  class="left">
       <el-menu  :router=true>
       <el-menu-item index="users"><i class="el-icon-menu"></i>用户管理</el-menu-item>
      <el-menu-item index="news"><i class="el-icon-menu"></i>资讯管理</el-menu-item>
      <el-menu-item index="movies_all"><i class="el-icon-menu"></i>电影管理</el-menu-item>
      <el-menu-item index="movies_rel"><i class="el-icon-menu"></i>电影院线匹配管理</el-menu-item> 
      <el-menu-item index="cinemas"><i class="el-icon-menu"></i>电影院线管理</el-menu-item>
      <el-menu-item index="pre_show"><i class="el-icon-menu"></i>即将上映</el-menu-item>
        <el-menu-item index="on_hot"><i class="el-icon-menu"></i>热映管理</el-menu-item>
      <el-menu-item index="on_show"><i class="el-icon-menu"></i>热播管理</el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="18" class="right" :offset="1">
    <router-view></router-view>
  
	</el-col>
	
</el-row>
 <el-row  :span="24" class="footer">@版权所有</el-row>
</div>
  



</template>
<script>
    import IndexManage from '@/components/manage/indexManage/IndexManage'
    import Cinemas from '@/components/manage/cinemas/Cinemas'
    import MoviesAll from '@/components/manage/moviesAll/MoviesAll'
    import MoviesRel from '@/components/manage/moviesRel/MoviesRel'
    import News from '@/components/manage/news/News'
    import OnHot from '@/components/manage/onHot/OnHot'
    import OnShow from '@/components/manage/onShow/OnShow'
    import PreShow from '@/components/manage/preShow/PreShow'
    import Users from '@/components/manage/users/Users'
    
    import {ajax} from "@/components/common/ajax"
    export default{
        data:function(){
            return {
                userName:"",
                path:"",
                tabs:[{name:"index",title:"欢迎",component:"IndexManage"}]
            }
        },
        created:function(){

            this.getSession();

        },
        components:{IndexManage,Cinemas},
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
            },
            removeTab(){
                
            }
        },
        watch:{
            "$route":function(nextPath){
                if(nextPath.path != "/"){

                    this.getSession();

//                    console.log(nextPath)

                }
            }
        }
    }

</script>
<style scoped>

	.row,.menu{
		background-color:#475669;
        height: 60px;
	}
	
    .left{
		background-color:#EFF2F7;
		height:520px;
	}
    .topTitle{
        padding-left: 20px;
/*
        display: flex;
        align-items: center;
*/
    }
    .topTitle p{
        line-height: 18px;
        color: #fff;
        font-size: 14px;
        word-spacing: 5px;
/*        text-indent: 6px;*/
    }
    .topTitle h2{
/*        height:520px;*/
        letter-spacing: 6px;
        font-size: 22px;
        color:white;
		padding-top:6px;
    }
	.right{
		height:520px;
/*        overflow: scroll;*/
	}
	.pagechange{
		margin-left:30px;
		margin-top:20px;
	}

	.student{
		width:100%;
		height:520px;
/*		background: #20A0FF;*/
	}
	.footer{
		height:36px;
		background-color:#475669;
		text-align:center;
		line-height:36px;
		color:white;
	}
</style>
