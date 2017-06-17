 <template>
   
    <div>
  <el-button
          size="middle"
          icon="plus"
          type="success"
          @click="dialogFormVisible = true"
          >添加</el-button>
          
<el-dialog title="添加" :visible.sync="dialogFormVisible" style="width:800px">
  <el-form label-position="right" label-width="120px">
    <el-form-item label="影院名称：" >
      <el-input v-model="cinemaName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    
    <el-form-item label="影院地址：">
      <el-input v-model="address" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    
    <el-form-item label="影院电话：" >
      <el-input v-model="tel" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
   
     <el-form-item label="官方网站：" >
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

          
<el-dialog title="添加影厅" :visible.sync="addaddHouseVisible" style="width:800px">
  <el-form label-position="right" label-width="120px">
    <el-form-item label="影厅名称：" >
      <el-input v-model="hName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-form-item label="座位：">
      <el-input v-model="sitSetting" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-button type="primary" @click="preSit">座位预览</el-button>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="addaddHouseVisible = false">取 消</el-button>
    <el-button type="primary" @click="addHouse">确 定</el-button>
  </div>
</el-dialog>
    
    
    
 <el-dialog title="座位预览" :visible.sync="preLookVisible" style="width:800px">
 <div v-for="r in this.sitData" style="margin-left:50px;">
 <label v-for="t in r">
 <label  v-if="t==0" class="showSitImg"></label >
 <label  v-if="t==1" class="hiddenSitImg"></label >
 </label>
 </div>
     
 <div slot="footer" class="dialog-footer">
        <el-button type="primary"@click="preLookVisible = false">确 定</el-button>
  </div>
</el-dialog>

 
 
    </div>
 

 </template>
    <script>
    
     import {ajax} from "@/components/common/ajax"
     import {mapState} from "vuex"
      import store from "@/store"
       export default{
       props:["show"],
       data(){
         return{
              cinemaName:'',
               address:"",
               tel:"",
               webAdress:"",
               dialogFormVisible:false,
               hName:"",
               addaddHouseVisible:false,
               sitSetting:"",
               preLookVisible:false,
               houses:[],
        }
     },
     computed:{
     ...mapState({
         sitData:state=>state.cinemas.sitData,
      })
     },
     methods:{
       preSit(){
        store.commit("SIT_DATA",this.sitSetting);
         this.preLookVisible=true;
           
        },
         addHouse(){
         let name=this.hName;
         this.$confirm('确认添加'+name+'厅', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                    let obj={};
                    obj.hName=this.hName;
                    obj.sitSetting=this.sitSetting;
                    this.houses.push(obj);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
           this.addaddHouseVisible=false; 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          }); 
        });
               
        },
       
        confirmAdd(){
             let name=this.cinemaName;
         this.$confirm('确认添加'+name+'影院', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                    let obj={};
                    obj.cinemaName=this.cinemaName;
                    obj.address=this.address;
                    obj.tel=this.tel;
                    obj.webAdress=this.webAdress;
                    obj.houses=JSON.stringify(this.houses);
                    console.log(this.houses);
                    ajax({
                        type:"get",
                        url:"/cinemas/add",
                        data:obj,
                        success:()=>{
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                   });
                   this.houses=[];
                  this.show(1);
                  this.dialogFormVisible=false;
              }
          })
                    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });          
        });
                     
        }
     },
     
     
    }
    </script>
    <style scoped>
   .showSitImg{
    display:inline-block;
    width:15px;
    height:15px;
    background:url("../../../img/tupian.png") no-repeat;
    background-size:100%;
    
   }
   .hiddenSitImg{
   display:inline-block;
    width:15px;
    height:15px;
    background:url("../../../img/tupian120.png") no-repeat;
    background-size:100%;
    
   }
    
    </style>