<template>
    
    <div class='deletestyle'>
        <el-button type="info" @click="dialogFormVisible = true" icon='plus'>添加</el-button>
        
        <el-dialog title="添加" :visible.sync=dialogFormVisible class='addDialog'>
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="电影中文名" label-width="100px" prop="cName">
              <el-input v-model="form.cName"></el-input>
            </el-form-item>
            <el-form-item label="电影英文名" label-width="100px" prop="eName">
              <el-input v-model="form.eName"></el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="100px" prop="type">
              <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="评分" label-width="100px" prop="scor">
              <el-input v-model="form.scor"></el-input>
            </el-form-item>
            <el-form-item label="演职人员" label-width="100px" prop="staffs">
              <el-input v-model="form.staffs"></el-input>
            </el-form-item>
            <el-form-item label="喜欢" label-width="100px" prop="favor">
              <el-input v-model="form.favor"></el-input>
            </el-form-item>
            <el-form-item label="地区" label-width="100px" prop="area">
              <el-input v-model="form.area"></el-input>
            </el-form-item>
            <el-form-item label="时长" label-width="100px" prop="duration">
              <el-input v-model="form.duration"></el-input>
            </el-form-item>
            <el-form-item label="上映时间" label-width="100px">
                
                  <el-form-item prop="releaseDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.releaseDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              
              </el-form-item>
            <el-form-item label="上映地区" label-width="100px" prop="releaseArea">
              <el-input v-model="form.releaseArea"></el-input>
            </el-form-item>
           <el-form-item label="简介" label-width="100px" prop="briefIntro">
              <el-input v-model="form.briefIntro" type='textarea'></el-input>
            </el-form-item>
<!--            上传封面-->
            <el-upload
              class="upload-demo"
              action="/movies/add"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture" :data='{poster:form.poster}'>
              <el-button type="primary">电影封面</el-button>
             </el-upload>
            
          </el-form>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAdd(form)">确 定</el-button>
         </div>
        </el-dialog>
       
       </div>
     
</template>
<script>
import {ajax} from "@/components/common/ajax";
import {mapState} from "vuex";
export default {
    
    props:['show'],
    data:function(){
      return {
          form:{
              
              cName:'',
              eName:'',
              type:'',
              scor:'',
              staffs:'',
              favor:'',
              area:'',
              year:'',
              duration:'',
              releaseDate:'',
              releaseArea:'',
              totalMoney:'',
              briefIntro:'',
              poster:''
            },
          dialogFormVisible:false,
          rules:{
              cName:[
                  {required:true,message:'电影中文名不能为空',trigger:'blur'},
                  {pattern:/^[\u4e00-\u9fa5\d]{1,}$/,message:'电影中文名为1位以上汉字或数字',trigger:'blur'}
              ],
              eName:[
                   {required:true,message:'电影英文名不能为空',trigger:'blur'},
                   {pattern:/^[0-9a-zA-z]{6,}$/,message:'电影英文名为6位以上字母或数字',trigger:'blur'}
              ],
              type:[
                   {required:true,message:'电影类型不能为空',trigger:'blur'},
                   {pattern:/^[\u4e00-\u9fa5,]{6,}$/,message:'电影类型为6位以上汉字或逗号',trigger:'blur'}
              ],
              scor:[
                   {required:true,message:'电影评分不能为空',trigger:'blur'},
                   {pattern:/^[0-10]{1,2}$/,message:'电影评分为1-10的数字',trigger:'blur'}
              ],
              favor:[
                  {required:true,message:'喜欢人数不能为空',trigger:'blur'},
                   {type: 'number',message:'喜欢人数为数值',trigger:'blur'}
              ],
              area:[
                   {required:true,message:'区域不能为空',trigger:'blur'},
                   {pattern:/^[\u4e00-\u9fa5]{1,}$/,message:'区域为中文',trigger:'blur'}
              ],
              year:[
                   {required:true,message:'上映时间不能为空',trigger:'blur'},
                   {pattern:/^\b201[0-9]{1}$/,message:'上映时间为201几年',trigger:'blur'}
              ],
              duration:[
                   {required:true,message:'电影时长不能为空',trigger:'blur'},
                   {pattern:/^[0-9]{1,}$/,message:'电影时长为大于1的数字',trigger:'blur'}
              ],
              releaseDate:[
                   {required:true,message:'电影上映时间不能为空',trigger:'blur'},
              ],
              releaseArea:[
                   {required:true,message:'电影上映地区不能为空',trigger:'blur'},
                   {pattern:/^[\u4e00-\u9fa5]{1,}$/,message:'电影上映地区为中文',trigger:'blur'}
              ],   
              totalMoney:[
                   {required:true,message:'电影总票房不能为空',trigger:'blur'},
                   {pattern:/^\d{1,}$/,message:'电影总票房为数字',trigger:'blur'}
              ],
              briefIntro:[
                   {required:true,message:'电影简介不能为空',trigger:'blur'},
                   {pattern:/^[0-9a-zA-Z\u4e00-\u9fa5]{1,}$/,message:'电影简介为中文数字字母',trigger:'blur'}
              ],
          },
          fileList2:{
              
          }
      }  
    },
    methods:{
        confirmAdd:function(form){
            
            let obj={
                cName:this.form.cName,
                eName:this.form.eName,
                type:this.form.type,
                scor:this.form.scor,
                staffs:this.form.staffs,
                favor:this.form.favor,
                area:this.form.area,
                year:this.form.year,
                duration:this.form.duration,
                releaseDate:this.form.releaseDate,
                releaseArea:this.form.releaseArea,
                totalMoney:this.form.totalMoney,
                briefIntro:this.form.briefIntro,
                totalMoney:this.form.totalMoney,
                poster:this.form.poster,
                
            }
            console.log(obj);
            this.$refs[form].validate((valid) => {
         if (valid) {
        this.$confirm('确认添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
               ajax({
                type:'post',
                url:'/movies/add',
                data:obj,
                success:(data)=>{
                    this.show({page:this.curpage,rows:5})
                }
            })        
        }).catch(() => {
          this.$message({
                type: 'info',
                message: '已取消添加'
                });          
            });  
         }
            })
            
            
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    computed:{
        ...mapState({
        curpage:state=>state.moviesAll.moviesData.curpage
        })
       }
    
}
</script>


<style scope>
 .deletestyle{
        float:left;
         margin:10px;
        
    }
    .addDialog{
        width:800px;
        height:480px;
        margin:auto;
        border:none;
        outline:none;
    }
</style>