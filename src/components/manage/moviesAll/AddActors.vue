<template>
   <div>
       
   
    <el-button type="info" @click="dialogFormVisible = true">添加演职人员</el-button>

        <el-dialog title="演职人员" :visible.sync="dialogFormVisible" size='mini'>
          <el-form :model="staffs" label-position="right">
            <el-form-item label="演员"  label-width="80px">
              <el-input v-model="staffs.staffName" auto-complete="off" style='width:200px'></el-input>
            </el-form-item>
             <el-form-item label="角色"  label-width="80px">
              <el-input v-model="staffs.role" auto-complete="off" style='width:200px'></el-input>
            </el-form-item>
            <el-upload
              class="upload-demo"
              action="/upload"
              list-type="picture"
              :on-success="handleResActor">
              <el-button type="primary">上传演员图片</el-button>
             </el-upload>
           </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            <button @click='tijiao'>tijiao</button>
          </div>
        </el-dialog>
    </div>
    
    
</template>


<script>
    
    export default{
        data:function(){
            return {
                dialogFormVisible: false,
                    staffs: {
                      staffsName: '',
                        role:'',
                        picture:''
                         },
            }
         },
        methods:{
            
            tijiao(){
                let newArry =[];
                newArry.push(this.staffs);
                console.log(this.staffs);
            },
            
            handleResActor(response, file, fileList){
               this.staffs.picture = file.response;
            }
            }
          }
        
  
    
</script>


<style>



</style>