    <template>
    <div>
    <el-dialog title="确认修改" :visible.sync="updateVisible" style="width:800px">
  <el-form :model="form" label-position="right" label-width="120px">
    <el-form-item label="影院名称：" :label-width="formLabelWidth">
      <el-input v-model="cinemaName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    
    <el-form-item label="影院地址：" :label-width="formLabelWidth">
      <el-input v-model="address" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    
    <el-form-item label="影院电话：" :label-width="formLabelWidth">
      <el-input v-model="tel" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
   
     <el-form-item label="官方网站：" :label-width="formLabelWidth">
      <el-input v-model="webAdress" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
  </el-form>
<div slot="footer" class="dialog-footer">
    <el-button 
          size="small"
          icon="plus"
          type="success" 
          @click="addaddHouseVisible = true"
          >添加影厅</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </div>
</el-dialog>

    </div>
    
    </template>
    <script>
      import {ajax} from "@/components/common/ajax"
      import {mapState} from "vuex"
       export default{
       data(){
        return{
            updateVisible:false;
        }
       },
       created:{
         commit
       }
        
    }
    </script>
    <style></style>