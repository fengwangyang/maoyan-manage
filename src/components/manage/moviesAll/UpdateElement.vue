<template>
    
    <div class='deletestyle'>
       
        <el-dialog title="修改" :visible.sync=dialogFormVisible class='addDialog' :before-close='closeDialog' size='large'>
          <el-form :model="form" :rules="rules" ref="form" :inline="true">
            <el-form-item label="电影中文名" label-width="100px" >
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
          <el-form-item prop="releaseDate" label="上映时间" label-width="100px">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.releaseDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
            <el-form-item label="上映地区" label-width="100px" prop="releaseArea">
              <el-input v-model="form.releaseArea"></el-input>
            </el-form-item>
           <el-form-item label="简介" label-width="100px" prop="briefIntro">
              <el-input v-model="form.briefIntro" type='textarea'></el-input>
            </el-form-item>
    </el-form>
         
<!--         显示封面-->
        <div>{{form.poster}}</div>
         
         <div>
       <label for="">演职人员:</label>
        <el-tag
          :key="tag"
          type='success'
          v-for="tag in staffName"
          :closable="true"
          @close="handleClose(tag)">
        {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 增加</el-button>
        
    </div>
          
          
          <div slot="footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="confirmUpdate">确 定</el-button>
         </div>
          
        </el-dialog>
       
       </div>
     
</template>
<script>
import {ajax} from "@/components/common/ajax";
import {mapState} from "vuex";
import store from "@/store";
export default {
    
    props:['show'],
    data:function(){
      return {
           inputVisible: false,
            inputValue: '',
            staffName:[],
          rules:{
              cName:[
                  {required:true,message:'电影中文名不能为空',trigger:'blur'},
                  {pattern:/^[\u4e00-\u9fa5\d]{1,}$/,message:'电影中文名为1位以上汉字或数字',trigger:'blur'}
              ],
              eName:[
                   {required:true,message:'电影英文名不能为空',trigger:'blur'},
                   {pattern:/^[0-9a-zA-z]{2,}$/,message:'电影英文名为2位以上字母或数字',trigger:'blur'}
              ],
              type:[
                   {required:true,message:'电影类型不能为空',trigger:'blur'},
                   {pattern:/^[\u4e00-\u9fa5,]{2,}$/,message:'电影类型为2位以上汉字或逗号',trigger:'blur'}
              ],
              scor:[
                   {required:true,message:'电影评分不能为空',trigger:'blur'},
                   {pattern:/^[0-9|10]{1,}$/,message:'电影评分为1-10的数字',trigger:'blur'}
              ],
              favor:[
                  {required:true,message:'喜欢人数不能为空',trigger:'blur'},
                   {pattern:/^[0-9]{1,}$/,message:'喜欢人数为大于1 的整数',trigger:'blur'}
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
                   {required:true,message:'电影简介不能为空',trigger:'blur'}
              ],
          }, 
      }  
    },
     created:function(){
          this.pushstaffName();
      },
    methods:{
         closeDialog:function(){
              store.commit('MOVIESALL_UPDATEDIV',false);
        }, 
         pushstaffName(){
             for(let i of this.form.staffs){
                this.staffName.push(i.staffName);
            }
        },
      handleClose(tag) {
        this.staffName.splice(this.staffName.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.staffName.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
        confirmUpdate:function(form){
            
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
                _id:this.form._id
             }
             ajax({
                type:'post',
                url:'/movies/update',
                data:obj,
                success:(data)=>{
                    console.log(data);
                    this.show({page:this.curpage,rows:5})
                }
            })  
            store.commit('MOVIESALL_UPDATEDIV',false);
//            this.$refs[form].validate((valid) => {
//         if (valid) {
//        this.$confirm('确认修改?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//               ajax({
//                type:'post',
//                url:'/movies/update',
//                data:obj,
//                success:(data)=>{
//                    this.show({page:this.curpage,rows:5})
//                }
//            })        
//        }).catch(() => {
//          this.$message({
//                type: 'info',
//                message: '已取消修改'
//                });          
//            });  
//         }
//            })
//            
//            
//        },
//        
    },
    },
    computed:{
        ...mapState({
        form:state=>state.moviesAll.updateData,
        dialogFormVisible:state=>state.moviesAll.dialogVisible
    })
        
    }
    
    
    
}
</script>


<style scope>
 
    .addDialog{
        width:800px;
        height:480px;
        margin:auto;
        border:none;
        outline:none;
    }
</style>