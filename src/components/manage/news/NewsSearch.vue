    <template>
    <div>  
    <el-col :span="10">
  <el-input placeholder="请输入内容">
    <el-select class="sel" slot="prepend" placeholder="请选择">
      <el-option label="电影名" value="1"></el-option>
      <el-option label="电影明星" value="2"></el-option>
      <el-option label="电影类型" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="search"></el-button>
  </el-input>
     </el-col>
     
     <el-col :span="2">
         <el-button style="margin-left:20px" type="warning">清空</el-button>
     </el-col>
     
     <el-col :span="2">
         <el-button type="success">增加</el-button>
    </el-col>
        </div>  
    </template>
    
    <script>
        export default{
            data(){
                
            }
        }
        
    
    </script>
<style>

</style>